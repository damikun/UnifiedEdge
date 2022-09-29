using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerConfigDiffEvent_Handler</c>
    /// </summary>
    public class ServerConfigDiffEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerConfigDiffEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerConfigDiffEvent_Handler(ILogger logger)
        {
            _logger = logger;
        }

        public Task Handle(
            ServerGenericEventNotification<ServerConfigDiffEvent> notification,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}