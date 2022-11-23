
namespace Server
{
    public class MessageEventBase
    {
        public string? ServerUid { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }

}