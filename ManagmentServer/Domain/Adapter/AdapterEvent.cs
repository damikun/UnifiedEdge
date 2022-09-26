
namespace Domain.Server
{
    public enum AdapterState
    {
        Down,
        UP
    }

    public class AdapterEvent
    {
        public long ID { get; set; }

        public string AdapterId { get; set; }

        public AdapterState State { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }

}