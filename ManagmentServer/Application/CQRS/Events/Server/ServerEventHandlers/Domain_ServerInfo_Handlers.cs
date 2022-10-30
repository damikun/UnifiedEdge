using Server;
using MediatR;
using Persistence;
using Domain.Event;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>Domain_ServerInfo_SaveEvent_Handler</c>
    /// </summary>
    public class Domain_ServerInfo_SaveEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerInfoEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public Domain_ServerInfo_SaveEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;
            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerInfoEvent> notification,
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
                    TimeStamp = e.TimeStamp,
                    ServerUid = e.UID,
                    Name = e.Message,
                    Description = e.Description,
                    Type = EventType.info
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}