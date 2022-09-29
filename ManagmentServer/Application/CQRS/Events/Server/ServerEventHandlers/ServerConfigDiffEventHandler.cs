using Server;
using MediatR;
using Persistence;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

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

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerConfigDiffEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerConfigDiffEvent> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            var serialized_current = Serialize(e.CurrentConfig);
            var serialized_cfg = Serialize(e.Config);

            dbContext.ServerEvents.Add(
                new Domain.Server.Events.ServerConfigDiffEvent()
                {
                    ConfigJson = serialized_cfg,
                    CurrentConfigJson = serialized_current,
                    TimeStamp = e.TimeStamp,
                    ServerUid = e.UID,
                    Name = nameof(ServerClientConnected),
                    Description = "",
                    Type = Domain.Server.EventType.warning
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }

        private string Serialize(IServerCfg cfg)
        {
            return JsonConvert.SerializeObject(
                cfg,
                new JsonSerializerSettings
                {
                    Formatting = Formatting.None,
                    TypeNameHandling = TypeNameHandling.All
                }
            );
        }
    }
}