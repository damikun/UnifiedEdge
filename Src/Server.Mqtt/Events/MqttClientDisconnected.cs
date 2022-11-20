using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerClientDisconnected : ServerEventBase
    {
        public DTO_MqttClient Client { get; set; }
    }
}