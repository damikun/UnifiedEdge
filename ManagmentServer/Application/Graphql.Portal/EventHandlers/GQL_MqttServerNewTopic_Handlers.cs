using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{
    public class GQL_MqttServerNewTopic_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerNewInboundTopic>>
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

        public GQL_MqttServerNewTopic_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerNewInboundTopic> notification,
            CancellationToken cancellationToken
        )
        {
            await Task.CompletedTask;
        }
    }
}