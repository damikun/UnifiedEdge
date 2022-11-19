
namespace Server.Mqtt.DTO
{
    public class DTO_StoredMqttClient
    {
        public DTO_StoredMqttClient()
        {

        }

        internal static string GetUid(string clinet_id, string serverUid)
        {
            return $"MqttClient.{serverUid}.{clinet_id}";
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

    }
}