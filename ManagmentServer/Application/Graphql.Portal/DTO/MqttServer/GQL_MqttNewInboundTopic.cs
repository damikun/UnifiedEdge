
namespace Server.Mqtt.DTO
{
    public class GQL_MqttNewInboundTopic
    {
        public GQL_MqttNewInboundTopic()
        {

        }

        public GQL_MqttServerTopicStat Topic { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}