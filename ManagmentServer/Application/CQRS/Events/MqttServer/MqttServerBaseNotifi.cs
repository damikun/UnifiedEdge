using MediatR;
using Aplication.Core;
using System.Diagnostics;
using Aplication.Services;

namespace Aplication.Events.MqttServer
{

    /// <summary>
    /// Base abstract class of all MqttServer notifications (DomainEvents)
    /// </summary>
    public abstract class MqttServerBaseNotifi : BaseNotifi
    {
        public MqttServerBaseNotifi(string server_guid)
        {
            ActivityId = Activity.Current?.Id;

            MqttServerGuid = server_guid;
        }

        public string MqttServerGuid { get; set; }

    }

    /// <summary>
    /// Shared handler for all MqttServer Notifis
    /// </summary>
    public class MqttServerSharedNotifi_Handler : INotificationHandler<INotifiBase>
    {

        public MqttServerSharedNotifi_Handler()
        {

        }

        public Task Handle(INotifiBase Notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}