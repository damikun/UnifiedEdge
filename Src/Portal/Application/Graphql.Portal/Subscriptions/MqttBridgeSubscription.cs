using AutoMapper;
using Aplication.DTO;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Aplication.Extensions.Mqtt;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// Mqtt Bridge Subscriptions
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class MqttBridgeSubscription
    {
        private readonly IMapper _mapper;

        public MqttBridgeSubscription(
            IMapper mapper
        )
        {
            _mapper = mapper;
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<string>> MqttSubscribe(
            [ID] string server_id,
            string topic,
            GQL_MqttServerMetricSource metric,
            [Service] IMqttTopicEventReceiver receiver)
        {
            return receiver.SubscribeAsync<string>(server_id, topic);
        }
    }
}