using MediatR;
using Aplication.DTO;
using Aplication.Core;
using System.Diagnostics;
using Aplication.Services;

namespace Aplication.Events.EdgeCfg
{

    /// <summary>
    /// Base abstract class of all Edge notifications (DomainEvents)
    /// </summary>
    public abstract class EdgeBaseNotifi : BaseNotifi
    {
        public EdgeBaseNotifi(DTO_Edge edge)
        {
            ActivityId = Activity.Current?.Id;

            Edge = edge;
        }

        public DTO_Edge Edge { get; set; }

    }

    /// <summary>
    /// Shared handler for all Edge Notifis
    /// </summary>
    public class EdgeSharedNotifi_Handler : INotificationHandler<INotifiBase>
    {

        public EdgeSharedNotifi_Handler()
        {

        }

        public Task Handle(INotifiBase Notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}