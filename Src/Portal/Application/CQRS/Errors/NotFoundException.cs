
namespace Aplication.CQRS.Errors
{

    public class NotFoundException : Exception
    {
        public string Id { get; private set; }

        public NotFoundException(string id)
        : base("Requested item was not found")
        {
            Id = id;
        }
    }

}