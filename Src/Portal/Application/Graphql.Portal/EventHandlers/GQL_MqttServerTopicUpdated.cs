using MediatR;
using AutoMapper;
using Server.Mqtt;
using Server.Mqtt.DTO;
using Persistence.Portal;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{
    public class GQL_MqttServerTopicUpdetd_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerTopicUpdated>>
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

        public GQL_MqttServerTopicUpdetd_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerTopicUpdated> notification,
            CancellationToken cancellationToken
        )
        {
            var e = notification.ServerEvent;

            if (e == null || e.Topic == null || e.ServerUid == null)
            {
                return;
            }

            var gql_topic_dto = _mapper.Map<GQL_MqttTopic>(e.Topic);

            await _sender.SendAsync(
                $"EdgeMqttServer.{gql_topic_dto.ServerUid}.TopicUpdated",
                gql_topic_dto
            );
        }
    }
}