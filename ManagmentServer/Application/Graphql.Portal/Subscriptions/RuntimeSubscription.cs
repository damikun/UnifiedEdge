using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// Runtime Subscriptions
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Subscription)]
    public class RuntimeSubscription
    {
        private readonly ITopicEventSender _sender;

        private readonly IMapper _mapper;

        public RuntimeSubscription(
            ITopicEventSender sender,
            IMapper mapper
        )
        {
            _sender = sender;

            _mapper = mapper;
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_Uptime>> Uptime(
            [Service] ITopicEventReceiver receiver)
        {
            return receiver.SubscribeAsync<string, GQL_Uptime>("Uptime");
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<DateTime>> SystemTime(
            [Service] ITopicEventReceiver receiver)
        {
            return receiver.SubscribeAsync<string, DateTime>("SystemTime");
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_Metric>> RuntimeMetric(
            GQL_RuntimeMetricSource source,
            [Service] ITopicEventReceiver receiver)
        {
            var topic = $"{RuntimeCollector.Prefix}.{_mapper.Map<string>(source)}";

            return receiver.SubscribeAsync<string, GQL_Metric>(topic);
        }

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<GQL_ServerStateChangedNotification>> ServerStateChanged(
            [ID] string server_id,
            [Service] ITopicEventReceiver receiver)
        {
            var topic = $"ServerStateChanged.{server_id}";

            return receiver.SubscribeAsync<string, GQL_ServerStateChangedNotification>(topic);
        }
    }
}