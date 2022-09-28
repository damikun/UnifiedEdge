namespace Server
{
    public class ServerConfigDiffEvent : ServerEventBase
    {
        public IServerCfg Config { get; set; }

        public IServerCfg CurrentConfig { get; set; }
    }
}