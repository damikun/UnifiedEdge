
namespace Server.Event
{

    public class ServerBaseArgs : EventArgs
    {
        public string Server_UID { get; init; }
    }

    public class ServerEventArgs : ServerBaseArgs
    {
        public IServerCfg Config { get; set; }
    }

    public class ServerStateChangedEventArgs : ServerBaseArgs
    {
        public ServerState Before { get; init; }

        public ServerState After { get; init; }
    }
}