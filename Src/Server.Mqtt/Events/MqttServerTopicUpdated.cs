using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerTopicUpdated : ServerEventBase
    {
        public DTO_MqttTopic Topic { get; set; }
    }
}