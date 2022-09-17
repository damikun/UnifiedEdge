namespace Server
{
    public abstract class ServerCfg : IServerCfg
    {
        public string Server_UID { get; init; }

        DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}