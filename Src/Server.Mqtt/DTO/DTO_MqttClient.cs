
namespace Server.Mqtt.DTO
{
    public class DTO_MqttClient
    {
        public DTO_MqttClient()
        {

        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Protocol
        /// </summary>
        public DTO_MqttProtocol Protocol { get; set; }

        // <summary>
        /// ConnectedAt
        /// </summary>
        public DateTime? ConnectedAt { get; set; }

        // // <summary>
        // /// Session
        // /// </summary>
        // public DTO_MqttClientSession Session { get; set; }

        // // <summary>
        // /// Statistics
        // /// </summary>
        // public DTO_MqttClientStatistics Statistics { get; set; }

    }
}