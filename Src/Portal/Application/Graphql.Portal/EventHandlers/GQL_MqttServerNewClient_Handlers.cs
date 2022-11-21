using MediatR;
using AutoMapper;
using Server.Mqtt;
using Server.Mqtt.DTO;
using Persistence.Portal;
using Server.Manager.Mqtt;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    public class GQL_MqttServerNewClient_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerNewClient>>
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

        /// <summary>
        /// Injected <c>IMqttServerManager</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        public GQL_MqttServerNewClient_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory,
            IMqttServerManager manager)
        {
            _sender = sender;

            _factory = factory;

            _manager = manager;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerNewClient> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            if (e == null || e.Client == null || e.ServerUid == null)
            {
                return;
            }

            var gql_client_dto = _mapper.Map<GQL_MqttClient>(e.Client);

            var event_dto = new GQL_MqttNewClient()
            {
                TimeStamp = DateTime.Now,
                Client = gql_client_dto
            };

            await _sender.SendAsync(
                $"EdgeMqttServer.{gql_client_dto.ServerUid}.NewClient",
                event_dto
            );
        }
    }
}