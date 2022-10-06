
namespace Server.Mqtt.DTO
{

    public class DTO_MqttClientSession
    {
        public DTO_MqttClientSession()
        {

        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

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