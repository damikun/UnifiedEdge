using Domain.Event;

namespace Domain.Server.Events
{
    public abstract class ServerEventBase : EventBase
    {
        public string ServerUid { get; set; }
    }
}