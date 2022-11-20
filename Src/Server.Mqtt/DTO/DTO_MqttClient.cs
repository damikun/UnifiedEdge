
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
        /// ClientId
        /// </summary>
        public string ClientId { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Protocol
        /// </summary>
        public DTO_MqttProtocol Protocol { get; set; }

        // <summary>
        /// ConnectedTimeStamp
        /// </summary>
        public DateTime? ConnectedTimeStamp { get; set; }

        // <summary>
        /// DisconnectedTimeStamp
        /// </summary>
        public DateTime? DisconnectedTimeStamp { get; set; }

        // <summary>
        /// LastMessage
        /// </summary>
        public DateTime? LastMessageTimestamp { get; set; }

        // <summary>
        /// Endpoint
        /// </summary>
        public string? Endpoint { get; set; }


        internal static string BuildClientUid(string serverUid, string clinetId) => DTO_StoredMqttClient.GetUid(serverUid, clinetId);

    }
}