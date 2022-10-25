
namespace Server.Mqtt.DTO
{
    public class GQL_MqttClientConnected
    {
        public GQL_MqttClientConnected()
        {

        }

        public GQL_MqttClient Client { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}