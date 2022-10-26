
namespace Server.Mqtt.DTO
{
    public class DTO_MqttServerTopicStat
    {
        public DTO_MqttServerTopicStat()
        {

        }

        public string Id
        {
            get
            {
                return $"MqttTopicStat.{this.ServerUid}.{this.Topic}";
            }
        }

        public string ServerUid { get; set; }

        public string Topic { get; set; }

        public long Count { get; set; }

    }
}