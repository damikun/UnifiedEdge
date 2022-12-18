using MediatR;
using Aplication.DTO;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi server statistic reseted
    /// </summary>
    public class MqttServerAuthClientAddedNotifi : ServerBaseNotifi
    {
        public DTO_MqttAuthClient Client { get; set; }

        public MqttServerAuthClientAddedNotifi(
            string server_guid,
            DTO_MqttAuthClient client
        ) : base(server_guid)
        {
            Client = client;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerConfigChangedNotifi</c>
    /// </summary>
    public class MqttServerAuthClientAddedNotifi_Handler : INotificationHandler<ServerConfigChangedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttServerAuthClientAddedNotifi_Handler(ILogger logger)
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