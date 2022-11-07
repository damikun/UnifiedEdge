namespace Server.Mqtt
{
    public class MqttServerCfg : ServerCfg
    {
        public int Port { get; set; }

# nullable disable
        public string IpAddress { get; set; }
#nullable enable

        public TimeSpan CommunicationTimeout { get; set; }

        public bool PresistentSession { get; set; }

        public int MaxPendingMessagesPerClient { get; set; }
    }
}