
namespace Server.Mqtt.DTO
{
    public class MqttStoredTopic
    {
        public MqttStoredTopic()
        {
            Stats = new MqttTopicStat(this);
        }

        public static string GetUid(string server_uid, string topic)
        {
            if (string.IsNullOrEmpty(server_uid))
            {
                throw new ArgumentNullException(nameof(server_uid));
            }

            if (string.IsNullOrEmpty(topic))
            {
                throw new ArgumentNullException(nameof(topic));
            }

            var normalised_topic_name = topic.ToLowerInvariant();

            return $"MqttTopic.{server_uid},{normalised_topic_name}";
        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid
        {
            get
            {
                return GetUid(this.ServerUid, Topic);
            }
        }

        // <summary>
        /// Topic
        /// </summary>
        public string Topic { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Stats
        /// </summary>
        public MqttTopicStat Stats { get; }
    }
}