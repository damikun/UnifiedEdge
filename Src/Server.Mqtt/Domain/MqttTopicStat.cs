
namespace Server.Mqtt.DTO
{
    public class MqttTopicStat
    {
        private readonly MqttStoredTopic _topic;

        public MqttTopicStat(MqttStoredTopic topic)
        {
            _topic = topic;
        }

        internal static string GetUid(string topicUid)
        {
            if (string.IsNullOrEmpty(topicUid))
            {
                throw new ArgumentNullException(nameof(topicUid));
            }

            return $"MqttTopicStat.{topicUid}";
        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid
        {
            get
            {
                return GetUid(this._topic.Uid);
            }
        }

        private long _messages;

        public void ResetStats()
        {
            Interlocked.Exchange(ref _messages, 0);
        }

        public long MessagesCount { get => Interlocked.Read(ref _messages); }

        protected internal void IncrementMessagesCount() => Interlocked.Increment(ref _messages);
    }
}