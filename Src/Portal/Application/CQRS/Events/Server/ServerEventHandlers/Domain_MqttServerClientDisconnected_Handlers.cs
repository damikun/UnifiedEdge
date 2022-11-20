using MediatR;
using Server.Mqtt;
using Domain.Event;
using Persistence.Portal;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>Domain_MqttServerClientDisconnected_SaveEvent_Handler</c>
    /// </summary>
    public class Domain_MqttServerClientDisconnected_SaveEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientDisconnected>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public Domain_MqttServerClientDisconnected_SaveEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientDisconnected> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var server_event = notification?.ServerEvent ?? null;

            var client = server_event?.Client ?? null;

            if (server_event is null || client is null)
            {
                return;
            }

            dbContext.ServerEvents.Add(
                new Domain.Server.Events.ServerClientDisconnectedEvent()
                {
                    ClientUid = client.Uid,
                    TimeStamp = server_event.TimeStamp,
                    ServerUid = client.ServerUid,
                    Name = nameof(MqttServerClientDisconnected),
                    Type = EventType.info
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }

}