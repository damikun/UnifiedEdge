using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerStateChangedEvent_Handler</c>
    /// </summary>
    public class ServerStateChangedEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerStateChangedEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerStateChangedEvent_Handler(ILogger logger)
        {
            _logger = logger;
        }

        public Task Handle(
            ServerGenericEventNotification<ServerStateChangedEvent> notification,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}