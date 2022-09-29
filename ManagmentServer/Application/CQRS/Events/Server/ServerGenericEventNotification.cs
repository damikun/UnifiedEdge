using Server;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Server generic notifications 
    /// </summary>
    public class ServerGenericEventNotification<T> : ServerBaseNotifi where T : ServerEventBase
    {
        public T ServerEvent { get; set; }

        public ServerGenericEventNotification(T server_event) : base(server_event.UID)
        {
            ServerEvent = server_event;
        }
    }
}