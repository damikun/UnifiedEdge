
namespace Aplication.DTO
{
    public class DTO_MqttAuthEvent
    {
        public string ServerUid { get; set; }

        public DTO_MqttAuthLog Log { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}