using Server;

namespace Aplication.Services.ServerEventHandler
{
    public class ServerEventPublisher : IServerEventPublisher
    {
        private readonly IServerEventQueue _queueProvider;

        public ServerEventPublisher(IServerEventQueue queueProvider)
        {
            _queueProvider = queueProvider;
        }

        public void PublishError(string server_uid, Exception ex)
        {
            throw new NotImplementedException();
        }

        public void PublishEvent(ServerEventBase server_event)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(server_event));
        }

        public void PublishInfo(string server_uid, string name, string? description, string? json = null)
        {
            throw new NotImplementedException();
        }

        public void PublishWarning(string server_uid, string name, string? description, string? json = null)
        {
            throw new NotImplementedException();
        }
    }
}