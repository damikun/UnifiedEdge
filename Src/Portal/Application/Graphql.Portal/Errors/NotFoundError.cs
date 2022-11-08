using Aplication.CQRS.Errors;


namespace Aplication.Graphql.Errors
{

    public sealed class ItemNotFoundError : IResultError
    {
        public ItemNotFoundError(string[]? errors)
        {

        }

        public string ErrorType => GetType().Name;

        public string Message => "Requested item not found";

        public string[]? Errors { get; private set; }


        public static ItemNotFoundError? CreateErrorFrom(NotFoundException exception)
        {
            if (exception == null)
            {
                return null;
            }

            return new ItemNotFoundError(new string[] { "Item not Found" })
            {

            };
        }
    }

}