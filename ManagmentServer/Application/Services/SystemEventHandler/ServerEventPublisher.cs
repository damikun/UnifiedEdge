using Domain.Event;
using System.Text.Json;
using Domain.System.Events;

namespace Aplication.Services.SystemEventHandler
{
    public class SystemEventPublisher : ISystemEventPublisher
    {
        private readonly ISystemEventQueue _queueProvider;

        public SystemEventPublisher(ISystemEventQueue queueProvider)
        {
            _queueProvider = queueProvider;
        }

        public void PublishError(string name, Exception? ex = null)
        {
            string? serialized_ex = null;
            try
            {
                serialized_ex = JsonSerializer.Serialize(ex);
            }
            catch { }

            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(
                new SystemEvent()
                {
                    Name = name,
                    Description = ex?.Message,
                    Json = serialized_ex,
                    TimeStamp = DateTime.Now,
                    Type = EventType.error
                })
            );
        }

        public void PublishError(string name, string? description = null, string? json = null)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(
                new SystemEvent()
                {
                    Name = name,
                    Description = description,
                    Json = json,
                    TimeStamp = DateTime.Now,
                    Type = EventType.error
                })
            );
        }

        public void PublishInfo(string name, string? description = null, string? json = null)
        {
            _ = Task.Run(() => _queueProvider.Queue.Writer.WriteAsync(
                new SystemEvent()
                {
                    Name = name,
                    Description = description,
                    Json = json,
                    TimeStamp = DateTime.Now,
                    Type = EventType.info
                })
            );
        }

        public void PublishWarning(string name, string? description = null, string? json = null)
        {

        }
    }
}