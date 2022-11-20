using Server;
using MediatR;
using Domain.Event;
using Newtonsoft.Json;
using Persistence.Portal;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerConfigDiffEvent_Handler</c>
    /// </summary>
    public class Domain_ServerConfigDiff_SaveEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerConfigMatch>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public Domain_ServerConfigDiff_SaveEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerConfigMatch> notification,
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

            var serialized_online = SerializeCfg(e?.Online_Config ?? null);

            var serialized_offline = SerializeCfg(e?.Offline_Config ?? null);

            if (notification.ServerEvent.isMatch)
            {
                dbContext.ServerEvents.Add(
                    new Domain.Server.Events.ServerConfigDiffEvent()
                    {
                        IsMatch = true,
                        OnlineJson = serialized_online,
                        OfflineJson = serialized_offline,
                        TimeStamp = e.TimeStamp,
                        ServerUid = e.ServerUid,
                        Name = nameof(ServerConfigMatch),
                        Description = "",
                        Type = EventType.info
                    }
                );
            }
            else
            {
                dbContext.ServerEvents.Add(
                    new Domain.Server.Events.ServerConfigDiffEvent()
                    {
                        IsMatch = false,
                        OnlineJson = serialized_online,
                        OfflineJson = serialized_offline,
                        TimeStamp = e.TimeStamp,
                        ServerUid = e.ServerUid,
                        Name = nameof(ServerConfigMatch),
                        Description = "",
                        Type = EventType.warning
                    }
                );
            }

            await dbContext.SaveChangesAsync(cancellationToken);
        }

        private string SerializeCfg(IServerCfg? cfg)
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