using MediatR;
using Aplication.Core;
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
            catch (ValidationException ex)
            {
                throw ex;
            }
            catch (AuthorizationException ex)
            {
                throw ex;
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

        private Activity? GetActivity(TRequest request)
        {
            if (request.GetType().IsSubclassOf(typeof(CommandBase)))
            {
                ISharedCommandBase I_base_command = request as ISharedCommandBase;

                if (I_base_command is not null && I_base_command.Flags.diable_tracing)
                {
                    return null;
                }
            }

            return _telemetry.AppSource.StartActivity(
                String.Format(
                    "UnhandledExBehaviour: Request<{0}>",
                    typeof(TRequest).FullName),
                    ActivityKind.Server)!;
        }
    }
}