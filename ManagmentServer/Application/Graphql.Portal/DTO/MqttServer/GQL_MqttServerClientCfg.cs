using Aplication.DTO;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttServerClientCfg : IMapFrom<DTO_MqttServerClientCfg>
    {
        public GQL_MqttServerClientCfg()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// ServerUID
        /// </summary>
        public string ServerUID { get; set; }

        // <summary>
        /// CommunicationTimeout
        /// </summary>
        public int CommunicationTimeout { get; set; }

        // <summary>
        /// PresistentSession
        /// </summary>
        public bool PresistentSession { get; set; }

        // <summary>
        /// MaxPendingMessagesPerClient
        /// </summary>
        public int MaxPendingMessagesPerClient { get; set; }
    }
}