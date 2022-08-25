
using MediatR;
using System.Diagnostics;
using Aplication.Services;
using Aplication.CQRS.Errors;
using Microsoft.Extensions.Logging;

namespace Aplication.CQRS.Behaviours
{

    /// <summary>
    /// UnhandledExBehaviour for MediatR pipeline
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public class UnhandledExBehaviour<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly ICurrentUser _currentUserService;
        private readonly ILogger _logger;
        private readonly ITelemetry _telemetry;

        public UnhandledExBehaviour(
            ICurrentUser currentUserService,
            ILogger logger,
            ITelemetry telemetry)
        {
            _currentUserService = currentUserService;
            _logger = logger;
            _telemetry = telemetry;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next
        )
        {

            var activity = GetActivity(request);

            try
            {
                activity?.Start();

                // Continue in pipe
                return await next();

            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);

                if (!ex.Data.Contains("command_failed"))
                    ex.Data.Add("command_failed", true);

                throw new InternalServerException(ex);

            }
            finally
            {
                activity?.Stop();
                activity?.Dispose();
            }
        }

        private Activity GetActivity(TRequest request)
        {
            return _telemetry.AppSource.StartActivity(
                String.Format(
                    "UnhandledExBehaviour: Request<{0}>",
                    typeof(TRequest).FullName),
                    ActivityKind.Server)!;
        }
    }
}