using MediatR;
using Aplication.Core;
using System.Diagnostics;

namespace Aplication.Events.System
{

    /// <summary>
    /// Base abstract class of all Server notifications (DomainEvents)
    /// </summary>
    public abstract class SystemBaseNotifi : BaseNotifi, INotification
    {
        public SystemBaseNotifi()
        {
            ActivityId = Activity.Current?.Id;
        }
    }
}