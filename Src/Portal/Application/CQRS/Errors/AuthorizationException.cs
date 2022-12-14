using FluentValidation.Results;

namespace Aplication.CQRS.Errors
{

    public class AuthorizationException : Exception
    {
        public AuthorizationException()
            : base("Unauthorised")
        {
            Errors = new ValidationFailure[0];
        }

        public AuthorizationException(ValidationFailure[]? failures)
            : this()
        {
            Errors = failures;
        }

        public AuthorizationException(string? message)
        : base(message)
        {
            Errors = new ValidationFailure[0];
        }

        public ValidationFailure[]? Errors { get; }
    }

}