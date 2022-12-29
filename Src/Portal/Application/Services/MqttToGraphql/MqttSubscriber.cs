using Server.Mqtt.DTO;
using System.Threading.Channels;
using HotChocolate.Subscriptions;
using static HotChocolate.Subscriptions.MessageKind;

namespace Aplication.Extensions.Mqtt;

public class MqttSubscribeChannel
{
    public string Uid { get; init; }

    private string ServerUid { get; init; }

    private CancellationTokenSource cts { get; } = new();

    private Channel<MessageEnvelope<DTO_MqttMessage>> _channel;

    private readonly IMqttSubscriptionManager _sub_manager;

    private static readonly MessageEnvelope<DTO_MqttMessage> _completed = new(kind: Completed);

    public const int QUEUE_SIZE = 1000;

    private volatile int _threadSafeBool = 0;

    public bool isCompleted
    {
        get { return (Interlocked.CompareExchange(ref _threadSafeBool, 1, 1) == 1); }
        private set
        {
            if (value) Interlocked.CompareExchange(ref _threadSafeBool, 1, 0);
            else Interlocked.CompareExchange(ref _threadSafeBool, 0, 1);
        }
    }

    public string Topic { get; private set; }

    public MqttSubscribeChannel(
        string uid,
        string topic,
        string server_uid,
        IMqttSubscriptionManager manager
    )
    {
        _sub_manager = manager;

        Uid = uid;

        _channel = Channel.CreateUnbounded<MessageEnvelope<DTO_MqttMessage>>();

        Topic = topic;
    }

    public ValueTask<MessageEnvelope<DTO_MqttMessage>> ReadAsync(CancellationToken ct)
    {
        return _channel.Reader.ReadAsync(ct);
    }

    public ValueTask WriteAsync(DTO_MqttMessage message, CancellationToken ct)
    {
        // The new messages get dropped
        if (_channel.Reader.Count > QUEUE_SIZE)
        {
            return ValueTask.CompletedTask;
        }

        return _channel.Writer.WriteAsync(
            new MessageEnvelope<DTO_MqttMessage>(message),
            ct)
        ;
    }

    public async ValueTask CancleAsync()
    {
        if (isCompleted)
        {
            return;
        };

        isCompleted = true;

        try
        {
            await _sub_manager.CancleSubscription(this.ServerUid, this.Uid);
        }
        catch
        {

        }

        await _channel.Writer.WriteAsync(_completed);
    }

}
