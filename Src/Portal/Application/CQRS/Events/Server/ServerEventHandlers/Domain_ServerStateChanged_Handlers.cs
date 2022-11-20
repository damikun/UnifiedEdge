using Server;
using MediatR;
using Domain.Event;
using Persistence.Portal;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>Domain_ServerStateChangedEvent_SaveEvent_Handler</c>
    /// </summary>
    public class Domain_ServerStateChangedEvent_SaveEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerStateChangedEvent>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public Domain_ServerStateChangedEvent_SaveEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerStateChangedEvent> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var e = notification.ServerEvent;

            if (e is null || e.ServerUid is null)
            {
                return;
            }

            dbContext.ServerEvents.Add(
                new Domain.Server.Events.ServerStateChangedEvent()
                {
                    State = e.State.ToString(),
                    TimeStamp = e.TimeStamp,
                    ServerUid = e.ServerUid,
                    Name = nameof(ServerStateChangedEvent),
                    Type = EventType.info
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}