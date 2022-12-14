
namespace Server.Mqtt.DTO
{
    public class DTO_StoredMqttClient
    {
        public DTO_StoredMqttClient()
        {

        }

        public static string GetUid(string server_uid, string clinet_id)
        {
            var normalised_client_id = clinet_id.ToLowerInvariant();

            return $"MqttClient.{server_uid}.{normalised_client_id}";
        }

        // <summary>
        /// Uid
        /// </summary>

        public string Uid
        {
            get
            {
                return GetUid(this.ServerUid, this.ClientId);
            }
        }

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

    }
}