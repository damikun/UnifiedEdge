using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt;
using Server.Mqtt.DTO;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{
    public class ServerNewInboundTopic_PublishToGqlSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerNewInboundTopic>>
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

        public ServerNewInboundTopic_PublishToGqlSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerNewInboundTopic> notification,
            CancellationToken cancellationToken
        )
        {
            var e = notification.ServerEvent;

            var dto = new DTO_MqttServerTopicStat()
            {
                Count = 1,
                ServerUid = e.UID,
                Topic = e.Topic
            };

            var gql_topic_dto = _mapper.Map<GQL_MqttServerTopicStat>(dto);

            var gql_event = new GQL_MqttNewInboundTopic()
            {
                TimeStamp = DateTime.Now,
                Topic = gql_topic_dto
            };

            var topic = $"EdgeMqttServer.{e.UID}.NewInboundTopic";

            await _sender.SendAsync(topic, gql_event);
        }
    }
}