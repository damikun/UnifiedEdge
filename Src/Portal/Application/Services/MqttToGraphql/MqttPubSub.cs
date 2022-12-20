using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Subscriptions.Diagnostics;

namespace Aplication.Extensions.Mqtt;

public class MqttPubSub
: IMqttTopicEventReceiver
//, IMqttTopicEventSender
{
    internal const string Completed = "{completed}";

    private readonly IMqttSubscriptionManager _manager;

    private readonly IMqttMessageSerializer _messageSerializer;

    private readonly ISubscriptionDiagnosticEvents _diagnosticEvents;

    protected ISubscriptionDiagnosticEvents DiagnosticEvents => _diagnosticEvents;

    private readonly MessageEnvelope<object> _completed = new(Completed);

    public MqttPubSub(
        IMqttSubscriptionManager manager,
        IMqttMessageSerializer messageSerializer,
        ISubscriptionDiagnosticEvents diagnosticEvents
    )
    {
        _diagnosticEvents = diagnosticEvents;

        _manager = manager ??
            throw new ArgumentNullException(nameof(manager));

        _messageSerializer = messageSerializer ??
            throw new ArgumentNullException(nameof(messageSerializer));
    }

    public async ValueTask CompleteAsync(string server_uid, string uid)
    {
        await _manager.CancleSubscription(server_uid, uid);

        _diagnosticEvents.Send(uid, _completed);
    }

    // public ValueTask SendAsync<TMessage>(
    //     string server_uid,
    //     string topic,
    //     TMessage message,
    //     CancellationToken cancellationToken = default
    // )
    // {
    //     var serializedMessage = _messageSerializer.Serialize(message);

    //     var envelopeddiagMessage = new MessageEnvelope<TMessage>(message);

    //     _diagnosticEvents.Send(topic, envelopeddiagMessage);

    //     return _manager.Publish(server_uid, topic, serializedMessage);
    // }

    public async ValueTask<ISourceStream<TMessage>> SubscribeAsync<TMessage>(
        string server_uid,
        string topic,
        int? bufferCapacity = null,
        TopicBufferFullMode? bufferFullMode = null,
        CancellationToken cancellationToken = default
    )
    {
        _diagnosticEvents.TrySubscribe(topic, 1);

        var channel = await _manager.SubscribeAsync(server_uid, topic);

        _diagnosticEvents.SubscribeSuccess(topic);

        return new MqttEventStream<TMessage>(channel, _messageSerializer);
    }
}
