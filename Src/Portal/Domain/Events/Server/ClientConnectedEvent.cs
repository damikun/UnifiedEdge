namespace Domain.Server.Events
{
    public class ServerClientConnectedEvent : ServerEventBase
    {
        public string ClientId { get; set; }
    }
}