using AutoMapper;
using Server.Mqtt.DTO;
using HotChocolate.Execution;
using HotChocolate.Subscriptions.Diagnostics;

namespace Aplication.Extensions.Mqtt;

public class MqttPubSub
: IMqttTopicEventReceiver
{
    private readonly IMqttSubscriptionManager _manager;

    private readonly ISubscriptionDiagnosticEvents _diagnosticEvents;

    private readonly IMapper _mapper;

    public MqttPubSub(
        IMapper mapper,
        IMqttSubscriptionManager manager,
        ISubscriptionDiagnosticEvents diagnosticEvents
    )
    {
        _diagnosticEvents = diagnosticEvents;

        _mapper = mapper;

        _manager = manager ??
            throw new ArgumentNullException(nameof(manager));
    }

    public async ValueTask CompleteAsync(string server_uid, string uid)
    {
        await _manager.CancleSubscription(server_uid, uid);
    }

    public async ValueTask<ISourceStream<GQL_MqttMessage>> SubscribeAsync(
        string server_uid,
        string topic,
        CancellationToken cancellationToken = default
    )
    {
        _diagnosticEvents.TrySubscribe(topic, 1);

        var channel = await _manager.SubscribeAsync(server_uid, topic);

        _diagnosticEvents.SubscribeSuccess(topic);

        return new MqttEventStream(channel, _mapper);
    }
}
