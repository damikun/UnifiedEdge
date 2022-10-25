using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt;
using Domain.Event;
using Server.Mqtt.DTO;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>ServerClientDisconnectedEvent_Handler</c>
    /// </summary>
    public class ServerClientDisconnectedEvent_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerClientDisconnected>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerClientDisconnectedEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerClientDisconnected> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            dbContext.ServerEvents.Add(
                new Domain.Server.Events.ServerClientDisconnectedEvent()
                {
                    ClientId = e.ClientId,
                    TimeStamp = e.TimeStamp,
                    ServerUid = e.UID,
                    Name = nameof(ServerClientDisconnected),
                    Description = "",
                    Type = EventType.info
                }
            );

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }


    public class ServerClientDisconnected_PublishToGqlSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerClientDisconnected>>
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
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerClientDisconnected_PublishToGqlSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerClientDisconnected> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            var dto = new DTO_MqttClient()
            {
                Uid = e.ClientId,
                ServerUid = e.UID
            };

            var gql_client_dto = _mapper.Map<GQL_MqttClient>(dto);

            var gql_event = new GQL_MqttClientDisconnected()
            {
                TimeStamp = DateTime.Now,
                Client = gql_client_dto
            };


            await _sender.SendAsync(
                $"EdgeMqttServer.{gql_client_dto.ServerUid}.ClientDisconnected",
                gql_event
            );
        }
    }
}