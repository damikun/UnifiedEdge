namespace Domain.Server.Events
{
    public class ServerNewInboundTopicEvent : ServerEventBase
    {
        public string Topic { get; set; }
    }
}