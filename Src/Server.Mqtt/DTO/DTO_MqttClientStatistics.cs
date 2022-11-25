
using MQTTnet.Server;

namespace Server.Mqtt.DTO
{

    public class DTO_MqttClientStatistics
    {
        public DTO_MqttClientStatistics()
        {

        }

        public DTO_MqttClientStatistics(string serverUid, string clientUid, MqttClientStatus stats)
        {
            ClientUid = clientUid;
            ServerUid = serverUid;
            BytesSent = stats.BytesSent;
            BytesReceived = stats.BytesReceived;
            SentPacketsCount = stats.SentPacketsCount;
            ConnectedTimestamp = stats.ConnectedTimestamp;
            ReceivedPacketsCount = stats.ReceivedPacketsCount;
            LastPacketSentTimestamp = stats.LastPacketSentTimestamp;
            LastPacketReceivedTimestamp = stats.LastPacketReceivedTimestamp;
            SentApplicationMessagesCount = stats.SentApplicationMessagesCount;
            ReceivedApplicationMessagesCount = stats.ReceivedApplicationMessagesCount;
            LastNonKeepAlivePacketReceivedTimestamp = stats.LastNonKeepAlivePacketReceivedTimestamp;
        }

        public string Id
        {
            get
            {
                return $"MqttClinetStat.{this.ServerUid}.{this.ClientUid}";
            }
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