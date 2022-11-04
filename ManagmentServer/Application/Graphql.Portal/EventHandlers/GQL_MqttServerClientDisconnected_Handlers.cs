using MediatR;
using AutoMapper;
using Persistence.Portal;
using Server.Mqtt;
using Server.Mqtt.DTO;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    public class GQL_MqttServerClientDisconnected_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientDisconnected>>
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

        public GQL_MqttServerClientDisconnected_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientDisconnected> notification,
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