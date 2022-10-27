using Server;
using MediatR;
using AutoMapper;
using Persistence;
using Domain.Event;
using Domain.Server;
using Aplication.DTO;
using Newtonsoft.Json;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Aplication.Graphql.Interfaces;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerConfigDiffEvent_Handler</c>
    /// </summary>
    public class ServerConfigDiff_SaveEvent_Handler
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

        public ServerConfigDiff_SaveEvent_Handler(
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

            var serialized_online = SerializeCfg(e.Online_Config);

            var serialized_offline = SerializeCfg(e.Offline_Config);

            if (notification.ServerEvent.isMatch)
            {
                dbContext.ServerEvents.Add(
                    new Domain.Server.Events.ServerConfigDiffEvent()
                    {
                        IsMatch = true,
                        OnlineJson = serialized_online,
                        OfflineJson = serialized_offline,
                        TimeStamp = e.TimeStamp,
                        ServerUid = e.UID,
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
                        ServerUid = e.UID,
                        Name = nameof(ServerConfigMatch),
                        Description = "",
                        Type = EventType.warning
                    }
                );
            }

            await dbContext.SaveChangesAsync(cancellationToken);
        }

        private string SerializeCfg(IServerCfg cfg)
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

    public class ServerConfigDiff_PublishToGqlSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerConfigMatch>>
    {

        /// <summary>
        /// Injected <c>ITopicEventSender</c>
        /// </summary>
        private readonly ITopicEventSender _sender;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerConfigDiff_PublishToGqlSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IMediator mediator,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerConfigMatch> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            var server = await dbContext.Servers
                .AsNoTracking()
                .Where(e => e.UID == notification.ServerGuid)
                .FirstOrDefaultAsync(cancellationToken);

            if (server == null)
            {
                return;
            }

            var dto_server = _mapper.Map<ServerBase, Aplication.Interfaces.IServer>(server);

            var gql_server = _mapper.Map<GQL_IServer>(dto_server);

            var sub_event = new GQL_ConfigMatch()
            {
                IsMatch = e.isMatch,
                Server = gql_server,
                Timestamp = e.TimeStamp
            };

            await _sender.SendAsync(
                $"Server.{e.UID}.ConfigState",
                sub_event
            );
        }
    }
}