using MediatR;
using Aplication.DTO;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi server statistic reseted
    /// </summary>
    public class MqttServerAuthUserAddedNotifi : ServerBaseNotifi
    {
        public DTO_MqttAuthUser User { get; set; }

        public MqttServerAuthUserAddedNotifi(
            string server_guid,
            DTO_MqttAuthUser user
        ) : base(server_guid)
        {
            User = user;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerConfigChangedNotifi</c>
    /// </summary>
    public class MqttServerAuthUserAddedNotifi_Handler : INotificationHandler<ServerConfigChangedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttServerAuthUserAddedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerConfigChangedNotifi</c>
        /// </summary>
        public Task Handle(ServerConfigChangedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}