using AutoMapper;
using Server.Mqtt.DTO;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// Runtime Subscriptions
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class MqttServerSubscription
    {
        private readonly ITopicEventSender _sender;

        private readonly IMapper _mapper;

        public MqttServerSubscription(
            ITopicEventSender sender,
            IMapper mapper
        )
        {
            _sender = sender;

            _mapper = mapper;
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttClient>> MqttClientConnected(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            var topic = $"EdgeMqttServer.{server_id}.ClientConnected";

            return receiver.SubscribeAsync<string, GQL_MqttClient>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttClient>> MqttClientDisconnected(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            var topic = $"EdgeMqttServer.{server_id}.ClientDisconnected";

            return receiver.SubscribeAsync<string, GQL_MqttClient>(topic);
        }
    }
}