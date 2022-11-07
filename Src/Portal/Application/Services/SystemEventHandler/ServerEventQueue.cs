using Domain.System.Events;
using System.Threading.Channels;

namespace Aplication.Services.SystemEventHandler
{
    public class SystemEventQueue : ISystemEventQueue
    {
        public const int QUEUE_SIZE = 150;

        public readonly Channel<SystemEvent> _queue = Channel.CreateBounded<SystemEvent>(QUEUE_SIZE);

        public SystemEventQueue()
        {

        }

        public Channel<SystemEvent> Queue { get { return _queue; } }
    }
}