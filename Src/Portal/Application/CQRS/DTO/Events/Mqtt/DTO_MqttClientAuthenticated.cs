
namespace Aplication.DTO
{
    public class DTO_MqttClientAuthenticated
    {
        public string ServerUid { get; set; }

        public long AuthClientUid { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}