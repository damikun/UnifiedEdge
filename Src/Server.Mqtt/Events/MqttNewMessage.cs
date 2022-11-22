using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttNewMessage : ServerEventBase
    {

        public DTO_MqttMessage? Message { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime? TimeStamp { get; set; }
    }
}