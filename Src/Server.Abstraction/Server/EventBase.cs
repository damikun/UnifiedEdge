
namespace Server
{
    public class ServerEventBase
    {
        public string UID { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }

}