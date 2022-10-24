
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttServerStats : IMapFrom<DTO_MqttServerStats>
    {
        public GQL_MqttServerStats()
        {

        }

        public string Id
        {
            get
            {
                return $"MqttStat.{this.ServerUid}";
            }
        }

        public string ServerUid { get; set; }

        public long PublishedTopicCount { get; init; }
        public long SubscribedTopicCount { get; init; }
        public long SubscriptionsCount { get; init; }
        public long ConnectionsCount { get; init; }
        public long PacketRcvCount { get; init; }
        public long PacketSndCount { get; init; }
        public long NotConsumedCount { get; init; }

    }
}