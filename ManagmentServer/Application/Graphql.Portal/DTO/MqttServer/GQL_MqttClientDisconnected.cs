
namespace Server.Mqtt.DTO
{
    public class GQL_MqttClientDisconnected
    {
        public GQL_MqttClientDisconnected()
        {

        }

        public GQL_MqttClient Client { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}