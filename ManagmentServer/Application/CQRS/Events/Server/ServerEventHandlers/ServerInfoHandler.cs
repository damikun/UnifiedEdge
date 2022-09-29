using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerInfoEvent_Handler</c>
    /// </summary>
    public class ServerInfoEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerInfoEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerInfoEvent_Handler(ILogger logger)
        {
            _logger = logger;
        }

        public Task Handle(
            ServerGenericEventNotification<ServerInfoEvent> notification,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}