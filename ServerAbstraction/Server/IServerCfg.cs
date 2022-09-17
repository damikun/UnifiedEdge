

namespace Server
{
    public interface IServerCfg
    {
        public string Server_UID { get; init; }

        public bool IsEnabled { get; set; }

        public DateTime TimeStamp { get; init; }
    }
}