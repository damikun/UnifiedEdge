using AutoMapper;
using Server.Mqtt;
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
        public ValueTask<ISourceStream<GQL_MqttClient>> MqttClientUpdated(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.ClientUpdated"
            var topic = $"EdgeMqttServer.{server_id}.ClientUpdated";

            return receiver.SubscribeAsync<string, GQL_MqttClient>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttNewClient>> MqttNewClient(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.NewClient"
            var topic = $"EdgeMqttServer.{server_id}.NewClient";

            return receiver.SubscribeAsync<string, GQL_MqttNewClient>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttNewTopic>> MqttNewTopic(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.NewTopic"
            var topic = $"EdgeMqttServer.{server_id}.NewTopic";

            return receiver.SubscribeAsync<string, GQL_MqttNewTopic>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttTopic>> MqttTopicUpdated(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.c8f8bfb99a184a2b81f7845e23c3b0ad.TopicUpdated"
            var topic = $"EdgeMqttServer.{server_id}.TopicUpdated";

            return receiver.SubscribeAsync<string, GQL_MqttTopic>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_MqttClientStatsUpdate>> MqttServerClientStatistics(
            [ID] string server_id,
            [ID] string client_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.e3680052bcdb4ccf8034ee6856d88448.Client.someName.Statistics
            var topic = $"EdgeMqttServer.{server_id}.Client.{client_id}.Statistics";

            return receiver.SubscribeAsync<string, GQL_MqttClientStatsUpdate>(topic);
        }

        [SubscribeAndResolve]
        public async ValueTask<ISourceStream<GQL_MqttMessage>> MqttServerNewMessage(
            [ID] string server_id,
            [ID] string? client_id,
            [ID] string? topic_id,
            [Service] ITopicEventReceiver receiver
        )
        {
            //EdgeMqttServer.e3680052bcdb4ccf8034ee6856d88448.NewMessage
            var topic = $"EdgeMqttServer.{server_id}.NewMessage";

            var stream = await receiver.SubscribeAsync<string, GQL_MqttMessage>(topic);

            var filtred_stream = new MessageSourceStreamFilter<GQL_MqttMessage>(
                stream,
                client_id,
                topic_id
            );

            return filtred_stream as ISourceStream<GQL_MqttMessage>;
        }
    }
}