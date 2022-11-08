using Aplication.CQRS.Errors;


namespace Aplication.Graphql.Errors
{

    public sealed class ValidationError : IResultError
    {
        public ValidationError(ErrorSource[]? errors)
        {
            Errors = errors;
        }

        public string ErrorType => GetType().Name;

        public string Message => "One or more validation errors";

        public ErrorSource[]? Errors { get; private set; }


        public static ValidationError? CreateErrorFrom(ValidationException exception)
        {
            if (exception == null)
            {
                return null;
            }

            var error_arr = exception?.Errors?
            .Where(e => e != null)
            .Select(e => new ErrorSource()
            {
                Message = e.ErrorMessage,
                Property = e.PropertyName
            }).ToArray();


            return new ValidationError(error_arr)
            {

            };
        }
    }

}