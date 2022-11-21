
namespace Server.Mqtt.DTO
{
    public class DTO_MqttTopic
    {
        public DTO_MqttTopic()
        {

        }

        public DTO_MqttTopic(MqttStoredTopic topic)
        {
            ServerUid = topic.ServerUid;
            Topic = topic.Topic;
            Uid = topic.Uid;
            Stats = new DTO_MqttTopicStats(topic.Stats);
        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid { get; set; }

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
        public DTO_MqttTopicStats Stats { get; set; }


        public static DTO_MqttTopic MapFrom(MqttStoredTopic topic)
        {
            return new DTO_MqttTopic()
            {
                ServerUid = topic.ServerUid,
                Topic = topic.Topic,
                Uid = topic.Uid,
                Stats = new DTO_MqttTopicStats(topic.Stats)
            };
        }
    }
}