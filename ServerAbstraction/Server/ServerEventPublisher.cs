
namespace Server
{
    public class ServerEventPublisher : IServerEventPublisher
    {
        public void PublishInfo(string server_uid, string name, string? description, string? json = default)
        {

        }

        public void PublishWarning(string server_uid, string name, string? description, string? json = default)
        {

        }

        public void PublishError(string server_uid, string name, string? description, string? json = default)
        {

        }

        public void PublishError(string server_uid, Exception ex)
        {

        }

        public void PublishEvent(ServerEventBase server_event)
        {

        }
    }
}