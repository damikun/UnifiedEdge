using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Command handler for user <c>ServerErrorEvent_Handler</c>
    /// </summary>
    public class ServerErrorEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerErrorEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerErrorEvent_Handler(ILogger logger)
        {
            _logger = logger;
        }

        public Task Handle(
            ServerGenericEventNotification<ServerErrorEvent> notification,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}