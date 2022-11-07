
namespace Domain.Server
{
    public abstract class ServerBase
    {
        public long ID { get; init; }

        public string UID { get; init; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public bool IsEnabled { get; set; }

        public string? Location { get; set; }

        public DateTime Created { get; init; }

        public DateTime Updated { get; set; }

        public abstract ServerType Type { get; }

        public virtual ServerCfgBase Cfg { get; set; }

        public virtual ICollection<ServerIPv4Endpoint> Endpoints { get; set; } = new List<ServerIPv4Endpoint>();
    }

}