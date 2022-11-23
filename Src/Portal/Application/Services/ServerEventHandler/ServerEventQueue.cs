using Server;
using System.Threading.Channels;

namespace Aplication.Services.ServerEventHandler
{
    public class ServerEventQueue : IServerEventQueue
    {
        public const int EVENT_QUEUE_SIZE = 150;

        public const int MESSAGE_QUEUE_SIZE = 100;

        public readonly Channel<ServerEventBase> _event_queue = Channel.CreateBounded<ServerEventBase>(EVENT_QUEUE_SIZE);

        public readonly Channel<MessageEventBase> _message_queue = Channel.CreateBounded<MessageEventBase>(MESSAGE_QUEUE_SIZE);

        public ServerEventQueue()
        {

        }

        public Channel<ServerEventBase> EventQueue { get { return _event_queue; } }

        public Channel<MessageEventBase> MessageQueue { get { return _message_queue; } }

    }
}