using MediatR;
using FluentValidation;
using System.Diagnostics;
using Aplication.Services;
using FluentValidation.Results;
using Microsoft.Extensions.Logging;
using Aplication.Core;

namespace Aplication.CQRS.Behaviours
{

    /// <summary>
    /// Validation behaviour for MediatR pipeline
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public class ValidationBehaviour<TRequest, TResponse>
     : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly ICurrentUser _currentUser;
        private readonly IEnumerable<IValidator<TRequest>> _validators;
        private readonly ILogger _logger;
        private readonly ITelemetry _telemetry;

        public ValidationBehaviour(
            ICurrentUser currentUser,
            IEnumerable<IValidator<TRequest>> validators,
            ILogger logger,
            ITelemetry telemetry)
        {
            _currentUser = currentUser;
            _validators = validators;
            _logger = logger;
            _telemetry = telemetry;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            if (_validators.Any())
            {
                var activity = GetActivity(request);

                try
                {
                    activity?.Start();

                    var context = GetValidationCtx(request);

                    var failures = await Validate<TRequest>(context, cancellationToken);

                    if (failures.Count != 0)
                        return HandleValidationErrors(failures);
                }
                catch (Exception ex)
                {
                    _telemetry.SetOtelError(ex);

                    throw;
                }
                finally
                {
                    activity?.Stop();
                    activity?.Dispose();
                }
            }

            // Continue in pipe
            return await next();
        }

        private async Task<List<ValidationFailure>> Validate<T>(
            ValidationContext<T> ctx, CancellationToken ct)
        {
            var validationResults = await Task.WhenAll(
            _validators.Where(v => !(v is IAuthorizationValidator))
            .Select(v => v.ValidateAsync(ctx, ct)));

            return validationResults
            .SelectMany(r => r.Errors)
            .Where(f => f != null)
            .ToList();
        }

        private ValidationContext<TRequest> GetValidationCtx(TRequest request)
        {
            return new ValidationContext<TRequest>(request);
        }

        private static TResponse HandleValidationErrors(List<ValidationFailure> error_obj)
        {
            throw new Aplication.CQRS.Errors.ValidationException(error_obj?.ToArray());
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
                        "ValidationBehaviour: Request<{0}>",
                        request.GetType().FullName),
                        ActivityKind.Server)!;
        }
    }
}