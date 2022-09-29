namespace Domain.Server.Events
{
    public class ServerConfigDiffEvent : ServerEventBase
    {
        public string? ConfigJson { get; set; }

        public string? CurrentConfigJson { get; set; }
    }
}