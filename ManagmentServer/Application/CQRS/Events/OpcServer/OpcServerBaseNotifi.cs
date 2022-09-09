using MediatR;
using Aplication.Core;
using System.Diagnostics;
using Aplication.Services;

namespace Aplication.Events.OpcServer
{

    /// <summary>
    /// Base abstract class of all OpcServer notifications (DomainEvents)
    /// </summary>
    public abstract class OpcServerBaseNotifi : BaseNotifi
    {
        public OpcServerBaseNotifi(string server_guid)
        {
            ActivityId = Activity.Current?.Id;

            OpcServerGuid = server_guid;
        }

        public string OpcServerGuid { get; set; }

    }

    /// <summary>
    /// Shared handler for all OpcServer Notifis
    /// </summary>
    public class OpcServerSharedNotifi_Handler : INotificationHandler<INotifiBase>
    {

        public OpcServerSharedNotifi_Handler()
        {

        }

        public Task Handle(INotifiBase Notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}