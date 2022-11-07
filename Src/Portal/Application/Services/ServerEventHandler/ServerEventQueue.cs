using Server;
using System.Threading.Channels;

namespace Aplication.Services.ServerEventHandler
{
    public class ServerEventQueue : IServerEventQueue
    {
        public const int QUEUE_SIZE = 150;

        public readonly Channel<ServerEventBase> _queue = Channel.CreateBounded<ServerEventBase>(QUEUE_SIZE);

        public ServerEventQueue()
        {

        }

        public Channel<ServerEventBase> Queue { get { return _queue; } }
    }
}