namespace Server
{
    public class ServerStateChangedEvent : ServerEventBase
    {
        public ServerState State { get; set; }
    }
}