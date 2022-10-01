using Domain.Event;

namespace Domain.System.Events
{
    public class SystemEvent : EventBase
    {
        public string? Json { get; set; }

    }
}