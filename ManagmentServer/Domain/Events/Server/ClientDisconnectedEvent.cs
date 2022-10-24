namespace Domain.Server.Events
{
    public class ServerClientDisconnectedEvent : ServerEventBase
    {
        public string ClientId { get; set; }
    }
}