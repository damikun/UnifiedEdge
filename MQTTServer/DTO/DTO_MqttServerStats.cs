
namespace Server.Mqtt.DTO
{
    public class DTO_MqttServerStats
    {
        public DTO_MqttServerStats()
        {

        }

        public long PublishedTopicCount { get; init; }
        public long SubscribedTopicCount { get; init; }
        public long SubscriptionsCount { get; init; }
        public long ConnectionsCount { get; init; }
        public long PacketRcvCount { get; init; }
        public long PacketSndCount { get; init; }
        public long NotConsumedCount { get; init; }

    }
}