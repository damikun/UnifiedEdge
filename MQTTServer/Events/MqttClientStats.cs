
using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class MqttServerClientStatsPropagation : ServerEventBase
    {
        // <summary>
        /// ClientId
        /// </summary>
        public string ClientId { get; set; }

        // <summary>
        /// ServerId
        /// </summary>
        public string ServerId { get; set; }

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