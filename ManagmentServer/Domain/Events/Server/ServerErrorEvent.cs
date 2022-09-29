namespace Domain.Server.Events
{
    public class ServerErrorEvent : ServerEventBase
    {
        public string Message { get; set; }

        public string? Description { get; set; }

        public string? Json { get; set; }

        public Exception? Exception { get; set; }
    }
}