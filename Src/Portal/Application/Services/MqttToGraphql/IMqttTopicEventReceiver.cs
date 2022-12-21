using Server.Mqtt.DTO;
using HotChocolate.Execution;

namespace Aplication.Extensions.Mqtt;

public interface IMqttTopicEventReceiver
{
    ValueTask<ISourceStream<GQL_MqttMessage>> SubscribeAsync(string server_uid, string topic, CancellationToken cancellationToken = default);
}
