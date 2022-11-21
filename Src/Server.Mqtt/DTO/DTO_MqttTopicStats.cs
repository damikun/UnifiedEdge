
namespace Server.Mqtt.DTO
{
    public class DTO_MqttTopicStats
    {
        public DTO_MqttTopicStats()
        {

        }

        public DTO_MqttTopicStats(MqttTopicStat stat)
        {
            MessagesCount = stat.MessagesCount;
            Uid = stat.Uid;
        }

        public long MessagesCount { get; set; }

        public string Uid { get; set; }

        public static DTO_MqttTopicStats MapFrom(MqttTopicStat stat)
        {
            return new DTO_MqttTopicStats()
            {
                MessagesCount = stat.MessagesCount,
                Uid = stat.Uid
            };
        }
    }
}