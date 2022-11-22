
namespace Server.Mqtt.DTO
{
    public class MqttStoredMessage
    {
        public MqttStoredMessage()
        {
            _uid = Guid.NewGuid().ToString().ToLowerInvariant();
        }

        private string _uid;

        // <summary>
        /// Uid
        /// </summary>
        public string Uid
        {
            get
            {
                return $"MqttMessage.{ServerUid}.{_uid}";
            }
        }

        // <summary>
        /// ClientUid
        /// </summary>
        public string? ClientUid { get; set; }

        // <summary>
        /// ClientId
        /// </summary>
        public string? ClientId { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Payload
        /// </summary>
        public byte[]? Payload { get; set; }

        // <summary>
        /// ContentType
        /// </summary>
        public string? ContentType { get; set; }

        // <summary>
        /// Topic
        /// </summary>
        public string Topic { get; set; }

        // <summary>
        /// TopicUid
        /// </summary>
        public string TopicUid { get; set; }

        // <summary>
        /// ResponseTopic
        /// </summary>
        public string? ResponseTopic { get; set; }

        // <summary>
        /// Dup
        /// </summary>
        public bool Dup { get; set; }

        // <summary>
        /// Retain
        /// </summary>
        public bool Retain { get; set; }

        // <summary>
        /// Qos
        /// </summary>
        public byte Qos { get; set; }

        // <summary>
        /// ExpireInterval
        /// </summary>
        public int ExpireInterval { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime TimeStamp { get; set; }

    }
}