using Aplication.CQRS.Errors;


namespace Aplication.Graphql.Errors
{
    public sealed class InternalError : IResultError
    {
        public InternalError(string? error)
        {
            Error = error;
        }

        public string ErrorType => GetType().Name;

        public string Message => "Internal server error";

        public string? Error { get; private set; }


        public static InternalError? CreateErrorFrom(InternalServerException exception)
        {
            if (exception == null)
            {
                return null;
            }

            var variable = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            if (exception?.SourceException?.Message == null ||
                string.IsNullOrWhiteSpace(variable) ||
                !variable.ToLowerInvariant().Equals("Development", StringComparison.OrdinalIgnoreCase)
            )
            {
                return new InternalError(null);
            }

            return new InternalError(exception?.SourceException?.Message);
        }
    }

}