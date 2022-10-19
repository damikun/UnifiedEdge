using AutoMapper;
using Aplication.DTO;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// Runtime Subscriptions
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class ServerSubscription
    {
        private readonly ITopicEventSender _sender;

        private readonly IMapper _mapper;

        public ServerSubscription(
            ITopicEventSender sender,
            IMapper mapper
        )
        {
            _sender = sender;

            _mapper = mapper;
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_ServerMetric>> ServerMetrics(
            [ID] string? server_id,
            [Service] ITopicEventReceiver receiver)
        {
            var topic = $"Server.EdgeMqttServer.{server_id}.ConnectedClients";

            return receiver.SubscribeAsync<string, GQL_ServerMetric>(topic);
        }
    }
}