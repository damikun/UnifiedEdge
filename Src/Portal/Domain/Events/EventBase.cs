namespace Domain.Event
{
    public abstract class EventBase
    {

        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public EventType Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}