
namespace Server
{
    public class ServerEventBase
    {
        public string? ServerUid { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }

}