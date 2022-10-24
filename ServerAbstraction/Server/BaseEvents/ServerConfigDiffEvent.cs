namespace Server
{
    public class ServerConfigMatch : ServerEventBase
    {
        public bool isMatch { get; set; }

        public IServerCfg Config { get; set; }

        public IServerCfg CurrentConfig { get; set; }
    }
}