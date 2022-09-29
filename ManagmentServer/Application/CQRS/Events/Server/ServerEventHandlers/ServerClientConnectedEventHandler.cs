using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerClientConnectedEvent_Handler</c>
    /// </summary>
    public class ServerClientConnectedEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerClientConnected>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerClientConnectedEvent_Handler(ILogger logger)
        {
            _logger = logger;
        }

        public Task Handle(
            ServerGenericEventNotification<ServerClientConnected> notification,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}