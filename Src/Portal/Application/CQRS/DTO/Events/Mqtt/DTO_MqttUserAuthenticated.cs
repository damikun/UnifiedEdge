
namespace Aplication.DTO
{
    public class DTO_MqttUserAuthenticated
    {
        public string ServerUid { get; set; }

        public long AuthClientUid { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}