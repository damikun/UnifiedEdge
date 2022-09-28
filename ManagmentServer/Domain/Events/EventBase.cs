namespace Domain.Server
{
    public class EventBase
    {
        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public string? JsonData { get; set; }

        public string? ExceptionMessage { get; set; }

        public string? Exception { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}