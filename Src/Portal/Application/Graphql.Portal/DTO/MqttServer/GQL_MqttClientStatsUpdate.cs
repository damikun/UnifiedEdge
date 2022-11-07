
using Aplication.Mapping;
using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public class GQL_MqttClientStatsUpdate : IMapFrom<MqttServerClientStatsPropagation>
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
        public GQL_MqttClientStatistics Stats { get; set; }

        // <summary>
        /// Timestamp
        /// </summary>
        public DateTime Timestamp { get; set; } = DateTime.Now;

    }
}