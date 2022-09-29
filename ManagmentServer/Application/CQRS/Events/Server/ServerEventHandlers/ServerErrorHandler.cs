using Server;
using MediatR;
using Persistence;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

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

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerErrorEvent_Handler(
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
            await using ManagmentDbCtx dbContext =
                    _factory.CreateDbContext();

            var e = notification.ServerEvent;

            dbContext.ServerEvents.Add(
                new Domain.Server.Events.ServerErrorEvent()
                {
                    Json = e.Json,
                    Exception = e.Exception,
                    TimeStamp = e.TimeStamp,
                    ServerUid = e.UID,
                    Name = e.Message,
                    Description = e.Description,
                    Type = Domain.Server.EventType.error
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}