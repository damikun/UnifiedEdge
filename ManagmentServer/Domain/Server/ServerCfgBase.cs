
namespace Domain.Server
{
    public abstract class ServerCfgBase
    {
        public string ServerUID { get; init; }

        public abstract ServerType Type { get; }

        public ServerBase Server { get; set; }

        public bool IsEnabled { get; set; }

        public DateTime TimeStamp { get; init; }
    }

}