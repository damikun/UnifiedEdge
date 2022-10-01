using Domain.System.Events;
using System.Threading.Channels;

namespace Aplication.Services.SystemEventHandler
{
    public interface ISystemEventQueue
    {
        public Channel<SystemEvent> Queue { get; }
    }
}
