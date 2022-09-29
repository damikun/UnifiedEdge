using Server;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Server generic notifications 
    /// </summary>
    public class ServerGenericEventNotification<T> : ServerBaseNotifi
    {
        public ServerEventBase ServerEvent { get; set; }

        public ServerGenericEventNotification(ServerEventBase server_event) : base(server_event.UID)
        {
            ServerEvent = server_event;
        }
    }
}