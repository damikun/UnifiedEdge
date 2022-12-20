using System.Threading.Channels;

namespace Aplication.Extensions.Mqtt;

public class MqttSubscribeChannel
{
    public string Uid { get; init; }

    private Channel<string> _channel;

    public const int QUEUE_SIZE = 1000;

    private int _threadSafeBool = 0;

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
        string topic
    )
    {
        Uid = uid;

        _channel = Channel.CreateBounded<string>(QUEUE_SIZE);

        Topic = topic;
    }

    public ValueTask<string> ReadAsync(CancellationToken ct)
    {
        return _channel.Reader.ReadAsync(ct);
    }

    public async ValueTask CancleAsync()
    {

        if (isCompleted)
        {
            return;
        };

        await _channel.Writer.WriteAsync(MqttPubSub.Completed);

        isCompleted = true;
    }

}
