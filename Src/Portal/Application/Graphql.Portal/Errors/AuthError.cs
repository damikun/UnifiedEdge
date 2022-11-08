using Aplication.CQRS.Errors;


namespace Aplication.Graphql.Errors
{
    public sealed class AuthorizationError : IResultError
    {
        public AuthorizationError(ErrorSource[]? errors, string? description)
        {
            Errors = errors;

            Description = description;
        }

        public string ErrorType => GetType().Name;

        public string Message => "Authorization error";

        public string? Description { get; private set; }

        public ErrorSource[]? Errors { get; private set; }


        public static AuthorizationError? CreateErrorFrom(AuthorizationException exception)
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

            return new AuthorizationError(error_arr, exception?.Message)
            {

            };
        }
    }

}