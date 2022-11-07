using MediatR;
using AutoMapper;
using Persistence.Portal;
using Server.Mqtt;
using Server.Mqtt.DTO;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{

    public class GQL_MqttServerClientConnected_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientConnected>>
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

        public GQL_MqttServerClientConnected_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientConnected> notification,
            CancellationToken cancellationToken
        )
        {

            var e = notification.ServerEvent;

            var dto = new DTO_MqttClient()
            {
                Uid = e.ClientId,
                ServerUid = e.UID,
                Protocol = (DTO_MqttProtocol)e.Protocol,
                ConnectedAt = e.ConnectedAt,
            };

            var gql_client_dto = _mapper.Map<GQL_MqttClient>(dto);

            var gql_event = new GQL_MqttClientConnected()
            {
                TimeStamp = DateTime.Now,
                Client = gql_client_dto
            };

            var topic = $"EdgeMqttServer.{gql_client_dto.ServerUid}.ClientConnected";

            await _sender.SendAsync(topic, gql_event);
        }
    }
}