
namespace Server
{
    public interface IServerEventPublisher
    {
        public void PublishInfo(string server_uid, string name, string? description, string? json = default);

        public void PublishWarning(string server_uid, string name, string? description, string? json = default);

        public void PublishError(string server_uid, string Name, Exception? ex = null);

        public void PublishEvent(ServerEventBase server_event);

        public void PublishMessage(MessageEventBase message_event);
    }
}