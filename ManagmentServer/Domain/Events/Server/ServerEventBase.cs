namespace Domain.Server.Events
{
    public class ServerEventBase : EventBase
    {
        public string ServerUid { get; set; }
    }
}