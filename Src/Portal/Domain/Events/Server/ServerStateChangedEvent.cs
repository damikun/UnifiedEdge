namespace Domain.Server.Events
{
    public class ServerStateChangedEvent : ServerEventBase
    {
        public string State { get; set; }
    }
}