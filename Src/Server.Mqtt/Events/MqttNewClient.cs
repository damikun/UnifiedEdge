using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttNewClient : ServerEventBase
    {

        public DTO_MqttClient? Client { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime? TimeStamp { get; set; }
    }
}