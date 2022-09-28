
namespace Domain.Server
{
    public class ServerEvent : EventBase
    {

        public ServerEvent()
        {

        }

        public ServerEvent(
            string uid,
            Exception ex,
            string name = "Exception"
        )
        {
            Name = name;
            ServerUid = uid;
            Type = EventType.error;
            Description = ex.Message;
            Exception = ex.ToString();
            ExceptionMessage = ex.Message;
        }

        public string ServerUid { get; set; }
    }
}