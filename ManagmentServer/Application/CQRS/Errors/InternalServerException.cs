
namespace Aplication.CQRS.Errors
{

    public class InternalServerException : Exception
    {
        public Exception? SourceException { get;private set;} = null;

        public InternalServerException(Exception? ex = null)
            : base("Unhalted exception.")
        {

            SetException(ex);
        }

        private void SetException(Exception? ex){
            if(ex != null){
                SourceException = ex;
            }
        }

        public InternalServerException(string message, Exception? ex = null)
            : base(message)
        {
            SetException(ex);
        }

    }
}