
namespace Server.Mqtt.DTO
{

    public class DTO_MqttClientSession
    {
        public DTO_MqttClientSession()
        {

        }

        internal static string GetUid(string server_uid, string clinet_uid, string session_id)
        {
            return $"MqttClientSession.{server_uid}.{clinet_uid}.{session_id}";
        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid
        {
            get
            {
                return GetUid(this.ServerUid, this.ClientUid, this.SessionId);
            }
        }


        // <summary>
        /// SessionId
        /// </summary>
        public string SessionId { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// PendingMessages
        /// </summary>
        public long PendingMessages { get; set; }

        // <summary>
        /// Created
        /// </summary>
        public DateTime? Created { get; set; }

    }
}