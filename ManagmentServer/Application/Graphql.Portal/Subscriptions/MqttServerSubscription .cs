using AutoMapper;
using Server.Mqtt.DTO;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Server.Mqtt;

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
        public ValueTask<ISourceStream<GQL_MqttClientConnected>> MqttClientConnected(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.ClientConnected"
            var topic = $"EdgeMqttServer.{server_id}.ClientConnected";

            return receiver.SubscribeAsync<string, GQL_MqttClientConnected>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttClientDisconnected>> MqttClientDisconnected(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.ClientDisconnected"
            var topic = $"EdgeMqttServer.{server_id}.ClientDisconnected";

            return receiver.SubscribeAsync<string, GQL_MqttClientDisconnected>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttNewInboundTopic>> MqttNewInboundTopic(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.NewInboundTopic"
            var topic = $"EdgeMqttServer.{server_id}.NewInboundTopic";

            return receiver.SubscribeAsync<string, GQL_MqttNewInboundTopic>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttClientStatsUpdate>> MqttServerClientStatistics(
            [ID] string server_id,
            [ID] string client_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.e3680052bcdb4ccf8034ee6856d88448.Client.dsdsdsdsds.Statistics
            var topic = $"EdgeMqttServer.{server_id}.Client.{client_id}.Statistics";

            return receiver.SubscribeAsync<string, GQL_MqttClientStatsUpdate>(topic);
        }
    }
}