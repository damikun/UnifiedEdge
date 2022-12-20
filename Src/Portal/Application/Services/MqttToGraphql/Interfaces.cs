using HotChocolate.Execution;
using HotChocolate.Subscriptions;

namespace Aplication.Extensions.Mqtt;

public interface IMqttTopicEventReceiver
{
    ValueTask<ISourceStream<TMessage>> SubscribeAsync<TMessage>(string server_uid, string topic, int? bufferCapacity = null, TopicBufferFullMode? bufferFullMode = null, CancellationToken cancellationToken = default);
}

// public interface IMqttTopicEventSender
// {
//     ValueTask CompleteAsync(string server_uid, string topic);

//     ValueTask SendAsync<TMessage>(string server_uid, string topic, TMessage message, CancellationToken cancellationToken = default);
// }