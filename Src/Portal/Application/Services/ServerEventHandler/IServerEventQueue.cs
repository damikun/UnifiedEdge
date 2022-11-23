using Server;
using System.Threading.Channels;

namespace Aplication.Services.ServerEventHandler
{
    public interface IServerEventQueue
    {
        public Channel<ServerEventBase> EventQueue { get; }
        public Channel<MessageEventBase> MessageQueue { get; }
    }
}
