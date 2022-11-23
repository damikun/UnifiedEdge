using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttNewMessage : MessageEventBase
    {

        public DTO_MqttMessage? Message { get; set; }
    }
}