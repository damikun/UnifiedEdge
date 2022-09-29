namespace Domain.Server.Events
{
    public class ServerInfoEvent : ServerEventBase
    {
        public string Message { get; set; }
    }
}