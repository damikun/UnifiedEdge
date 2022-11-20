
using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerClientStatsPropagation : ServerEventBase
    {
        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

        // <summary>
        /// Stats
        /// </summary>
        public DTO_MqttClientStatistics Stats { get; set; }

        // <summary>
        /// Timestamp
        /// </summary>
        public DateTime Timestamp { get; set; } = DateTime.Now;

    }
}