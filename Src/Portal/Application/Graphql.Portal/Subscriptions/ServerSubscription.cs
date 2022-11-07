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
        public ValueTask<ISourceStream<GQL_ServerMetric>> MqttServerMetrics(
            [ID] string server_id,
            GQL_MqttServerMetricSource metric,
            [Service] ITopicEventReceiver receiver)
        {
            var topic = $"Server.EdgeMqttServer.{server_id}.{metric.ToString()}";

            return receiver.SubscribeAsync<string, GQL_ServerMetric>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_ConfigMatch>> MqttServerConfigState(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver)
        {
            var topic = $"Server.{server_id}.ConfigState";

            return receiver.SubscribeAsync<string, GQL_ConfigMatch>(topic);
        }
    }
}