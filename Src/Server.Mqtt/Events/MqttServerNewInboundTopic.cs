using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerNewInboundTopic : ServerEventBase
    {
        public DTO_MqttTopic Topic { get; set; }
    }
}