using FluentValidation.Results;

namespace Aplication.CQRS.Errors
{

    public class ValidationException : Exception
    {
        public ValidationException()
            : base("One or more validation failures have occurred.")
        {
            Errors = new ValidationFailure[0];
        }

        public ValidationException(ValidationFailure[]? failures)
            : this()
        {
            Errors = failures;
        }

        public ValidationException(string message)
        : base(message)
        {
            Errors = new ValidationFailure[0];
        }

        public ValidationFailure[]? Errors { get; }
    }

}