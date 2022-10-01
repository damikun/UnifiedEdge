using Domain.System.Events;

namespace Aplication.Events.System
{
    /// <summary>
    /// System event notifications 
    /// </summary>
    public class SystemEventNotification : SystemBaseNotifi
    {
        public SystemEvent ServerEvent { get; set; }

        public SystemEventNotification(SystemEvent se) : base()
        {
            ServerEvent = se;
        }
    }
}