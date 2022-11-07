namespace Server
{
    public class ServerConfigMatch : ServerEventBase
    {
        public bool isMatch { get; set; }

        public IServerCfg? Offline_Config { get; set; }

        public IServerCfg? Online_Config { get; set; }
    }
}