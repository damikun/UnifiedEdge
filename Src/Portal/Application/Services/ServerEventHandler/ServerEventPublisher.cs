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

        public void PublishError(string server_uid, string name, Exception? ex = null)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(
                new ServerErrorEvent()
                {
                    Message = name,
                    Exception = ex,
                    ServerUid = server_uid,
                    Description = ex != null ? ex.Message : ""
                })
            );
        }

        public void PublishEvent(ServerEventBase server_event)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(server_event));
        }

        public void PublishInfo(string server_uid, string name, string? description, string? json = null)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(
                new ServerInfoEvent()
                {
                    Message = name,
                    ServerUid = server_uid,
                    Description = description,
                    Json = json
                })
            );
        }

        public void PublishWarning(string server_uid, string name, string? description, string? json = null)
        {
            throw new NotImplementedException();
        }
    }
}