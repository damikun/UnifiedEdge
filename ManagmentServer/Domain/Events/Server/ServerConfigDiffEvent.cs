namespace Domain.Server.Events
{
    public class ServerConfigDiffEvent : ServerEventBase
    {
        public bool IsMatch { get; set; }

        public string? OfflineJson { get; set; }

        public string? OnlineJson { get; set; }
    }
}