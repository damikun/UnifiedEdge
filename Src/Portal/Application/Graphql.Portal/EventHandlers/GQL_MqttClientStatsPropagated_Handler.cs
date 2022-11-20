using MediatR;
using AutoMapper;
using Server.Mqtt;
using Persistence.Portal;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>GQL_MqttServerClientStatsPropagation_Handler</c>
    /// </summary>
    public class GQL_MqttServerClientStatsPropagation_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientStatsPropagation>>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ITopicEventSender</c>
        /// </summary>
        private readonly ITopicEventSender _sender;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GQL_MqttServerClientStatsPropagation_Handler(
            ILogger logger,
            IMapper mapper,
            ITopicEventSender sender,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _logger = logger;

            _mapper = mapper;

            _sender = sender;

            _factory = factory;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientStatsPropagation> notification,
            CancellationToken cancellationToken
        )
        {
            var e = notification.ServerEvent;

            if (e == null || e.ClientUid == null || e.ServerUid == null)
            {
                return;
            }

            var gql_updated_stat = _mapper.Map<GQL_MqttClientStatsUpdate>(e);

            var topic = $"EdgeMqttServer.{e.ServerUid}.Client.{e.ClientUid}.Statistics";

            await _sender.SendAsync(topic, gql_updated_stat);
        }
    }
}