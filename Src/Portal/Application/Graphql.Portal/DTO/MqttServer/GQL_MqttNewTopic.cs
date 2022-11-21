
namespace Server.Mqtt.DTO
{
    public class GQL_MqttNewTopic
    {
        public GQL_MqttNewTopic()
        {

        }

        public GQL_MqttTopic Topic { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}