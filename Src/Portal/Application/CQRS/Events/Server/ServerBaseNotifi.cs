using MediatR;
using Aplication.Core;
using System.Diagnostics;
using Aplication.Services;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Base abstract class of all Server notifications (DomainEvents)
    /// </summary>
    public abstract class ServerBaseNotifi : BaseNotifi, INotification
    {
        public ServerBaseNotifi(string? server_guid)
        {
            ActivityId = Activity.Current?.Id;

            ServerGuid = server_guid;
        }

        public string? ServerGuid { get; set; }

    }

    /// <summary>
    /// Shared handler for all Server Notifis
    /// </summary>
    public class ServerSharedNotifi_Handler : INotificationHandler<INotifiBase>
    {

        public ServerSharedNotifi_Handler()
        {

        }

        public Task Handle(INotifiBase Notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}