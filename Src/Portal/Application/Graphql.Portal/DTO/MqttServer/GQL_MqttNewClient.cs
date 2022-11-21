
namespace Server.Mqtt.DTO
{
    public class GQL_MqttNewClient
    {
        public GQL_MqttNewClient()
        {

        }

        public GQL_MqttClient Client { get; set; }

        public DateTime TimeStamp { get; set; }

    }
}