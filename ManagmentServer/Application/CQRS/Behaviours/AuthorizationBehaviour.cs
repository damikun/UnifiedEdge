using MediatR;
using Aplication.Core;
using FluentValidation;
using System.Reflection;
using System.Diagnostics;
using Aplication.Services;
using Aplication.CQRS.Errors;
using FluentValidation.Results;
using Microsoft.Extensions.Logging;

namespace Aplication.CQRS.Behaviours
{

    /// <summary>
    /// Authorization marker interface for Fluent validation
    /// </summary>
    public interface IAuthorizationValidator { }

    /// <summary>
    /// Authorization validator wrapper
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    public class AuthorizationValidator<TRequest>
    : AbstractValidator<TRequest>, IAuthorizationValidator
    { }

    /// <summary>
    /// Authorization behaviour for MediatR pipeline
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public class AuthorizationBehaviour<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly ICurrentUser _currentUserService;
        private readonly IEnumerable<IValidator<TRequest>> _validators;
        private readonly ILogger _logger;
        private readonly ITelemetry _telemetry;

        public AuthorizationBehaviour(
            ICurrentUser currentUserService,
            IEnumerable<IValidator<TRequest>> validators,
            ILogger logger,
            ITelemetry telemetry)
        {
            _currentUserService = currentUserService;
            _validators = validators;
            _logger = logger;
            _telemetry = telemetry;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {

            var authorizeAttributes = request?.GetType()
                .GetCustomAttributes<AuthorizeAttribute>();

            if (authorizeAttributes != null && authorizeAttributes.Any())
            {

                var activity = GetActivity(request);

                try
                {

                    if (typeof(TRequest).IsSubclassOf(typeof(CommandBase)))
                    {
                        ISharedCommandBase I_base_command = request as ISharedCommandBase;

                        if (I_base_command is not null && I_base_command.Flags.diable_tracing)
                        {
                            return await next();
                        }
                    }

                    activity?.Start();

                    // Must be authenticated user
                    if (!_currentUserService.Exist)
                        HandleUnAuthorised();

                    // Role-based authorization
                    var authorizeAttributesWithRoles = authorizeAttributes.Where(
                        a => !string.IsNullOrWhiteSpace(a.Roles)
                    );

                    if (authorizeAttributesWithRoles.Any())
                    {

                        foreach (var roles in authorizeAttributesWithRoles.Select(a => a.Roles.Split(',')))
                        {
                            var authorized = false;

                            foreach (var role in roles)
                            {

                                if (_currentUserService.HasRole(role.Trim()))
                                {
                                    authorized = true;
                                    break;
                                }
                            }

                            // Must be a member of at least one role in roles
                            if (!authorized)
                            {
                                HandleUnAuthorised("Role authorization failure");
                            }
                        }
                    }

                    // Policy-based authorization
                    var authorizeAttributesWithPolicies = authorizeAttributes.Where(
                        a => !string.IsNullOrWhiteSpace(a.Policy)
                    );

                    if (authorizeAttributesWithPolicies.Any())
                    {
                        foreach (var policy in authorizeAttributesWithPolicies.Select(a => a.Policy))
                        {
                            if (!_currentUserService.HasRole(policy.Trim()))
                            {
                                HandleUnAuthorised($"Policy: {policy} authorization failure");
                            }
                        }
                    }

                    if (authorizeAttributes.Any())
                    {
                        IValidator<TRequest>[] authValidators = _validators.Where(
                            v => v is IAuthorizationValidator).ToArray();

                        ValidationFailure[] authorization_validator_failures =
                            await CommandAuthValidationFailuresAsync(request, authValidators);

                        if (authorization_validator_failures.Any())
                            HandleUnAuthorised(authorization_validator_failures);
                    }

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

        private static void HandleUnAuthorised(object? error_obj = null)
        {
            if (error_obj is ValidationFailure[])
            {
                throw new AuthorizationException(error_obj as ValidationFailure[]);
            }
            else if (error_obj is string)
            {
                throw new AuthorizationException(error_obj as string);
            }

            throw new AuthorizationException();
        }

        private static async Task<ValidationFailure[]> CommandAuthValidationFailuresAsync(
            TRequest request,
            IEnumerable<IValidator<TRequest>> authValidators)
        {

            var validateTasks = authValidators
                .Select(v => v.ValidateAsync(request));

            var validateResults = await Task.WhenAll(validateTasks);

            var validationFailures = validateResults
                .SelectMany(r => r.Errors)
                .Where(f => f != null)
                .ToArray();

            return validationFailures == null ?
                new ValidationFailure[0] : validationFailures;
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
                        "AuthorizationBehaviour: Request<{0}>",
                        request?.GetType().FullName),
                        ActivityKind.Server)!;
        }
    }
}