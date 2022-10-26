namespace Server
{
    public class ServerConfigState
    {

        public string ServerUid { get; set; }

        public bool IsConfigMatch { get; set; }

        public string? OnlineConfig { get; set; }

        public string? OfflineConfig { get; set; }

        public DateTime? OnlineTimeStamp { get; set; }

        public DateTime? OfflineTimeStamp { get; set; }
    }
}