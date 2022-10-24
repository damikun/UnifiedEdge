namespace Domain.Server.Events
{
    public class ServerConfigDiffEvent : ServerEventBase
    {
        public bool IsMatch { get; set; }

        public string? ConfigJson { get; set; }

        public string? CurrentConfigJson { get; set; }
    }
}