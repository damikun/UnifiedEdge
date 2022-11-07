
namespace Domain.Server
{
    public class MqttServerCfg : ServerCfgBase
    {
        public TimeSpan CommunicationTimeout { get; set; }

        public bool PresistentSession { get; set; }

        public int MaxPendingMessagesPerClient { get; set; }

        public override ServerType Type => ServerType.mqtt;
    }
}