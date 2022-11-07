namespace Server
{
    public class ServerInfoEvent : ServerEventBase
    {
        public string Message { get; set; }

        public string? Description { get; set; }

        public string? Json { get; set; }
    }
}