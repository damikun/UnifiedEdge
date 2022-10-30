using Server;
using MediatR;
using Persistence;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Command handler for user <c>GQL_ServerError_PropagateSub_Handler</c>
    /// </summary>
    public class GQL_ServerError_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerErrorEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GQL_ServerError_PropagateSub_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerErrorEvent> notification,
            CancellationToken cancellationToken
        )
        {
            await Task.CompletedTask;
        }
    }
}