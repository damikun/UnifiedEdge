using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerClientConnected : ServerEventBase
    {
        public DTO_MqttClient? Client { get; set; }

        // <summary>
        /// ConnectedAt
        /// </summary>
        public DateTime? ConnectedAt { get; set; }
    }
}