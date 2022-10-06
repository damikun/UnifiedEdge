
namespace Server.Mqtt.DTO
{

    public class DTO_MqttClientStatistics
    {
        public DTO_MqttClientStatistics()
        {

        }

        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// SentPacketsCount
        /// </summary>
        public long SentPacketsCount { get; set; }

        // <summary>
        /// ReceivedPacketsCount
        /// </summary>
        public long ReceivedPacketsCount { get; set; }

        // <summary>
        /// SentApplicationMessagesCount
        /// </summary>
        public long SentApplicationMessagesCount { get; set; }

        // <summary>
        /// ReceivedApplicationMessagesCount
        /// </summary>
        public long ReceivedApplicationMessagesCount { get; set; }

        // <summary>
        /// BytesSent
        /// </summary>
        public long BytesSent { get; set; }

        // <summary>
        /// BytesReceived
        /// </summary>
        public long BytesReceived { get; set; }

        // <summary>
        /// LastNonKeepAlivePacketReceivedTimestamp
        /// </summary>
        public DateTime? LastNonKeepAlivePacketReceivedTimestamp { get; set; }

        // <summary>
        /// ConnectedTimestamp
        /// </summary>
        public DateTime? ConnectedTimestamp { get; set; }

        // <summary>
        /// LastPacketSentTimestamp
        /// </summary>
        public DateTime? LastPacketSentTimestamp { get; set; }

        // <summary>
        /// LastPacketReceivedTimestamp
        /// </summary>
        public DateTime? LastPacketReceivedTimestamp { get; set; }

    }
}