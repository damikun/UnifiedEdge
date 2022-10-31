using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttServerTopicStat : IMapFrom<DTO_MqttServerTopicStat>
    {
        public GQL_MqttServerTopicStat()
        {

        }

        public string Id { get; set; }

        public string Topic { get; set; }

        public long Count { get; set; }

    }
}