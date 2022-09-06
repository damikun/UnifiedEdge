
namespace Server.Domain
{
    public class ServerBase
    {
        public long ID { get; init; }

        public string Guid { get; init; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public bool IsEnabled { get; set; }

        public string? Location { get; set; }

        public DateTime Created { get; init; }

        public DateTime Updated { get; set; }
    }

}