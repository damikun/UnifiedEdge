
using HotChocolate.Execution;

namespace Aplication.Extensions.Mqtt;

public class MqttEventStream<TMessage> : ISourceStream<TMessage>
{
    private readonly MqttSubscribeChannel _channel;
    private readonly IMqttMessageSerializer _messageSerializer;
    private bool _read;
    private bool _disposed;

    public MqttEventStream(MqttSubscribeChannel channel, IMqttMessageSerializer messageSerializer)
    {
        _channel = channel;
        _messageSerializer = messageSerializer;
    }

    public IAsyncEnumerable<TMessage> ReadEventsAsync()
    {
        if (_read)
        {
            throw new InvalidOperationException("This stream can only be read once.");
        }

        if (_disposed || _channel.isCompleted)
        {
            throw new ObjectDisposedException(nameof(MqttEventStream<TMessage>));
        }

        _read = true;
        return new EnumerateMessages<TMessage>(
            _channel,
            _messageSerializer.Deserialize<TMessage>);
    }

    IAsyncEnumerable<object> ISourceStream.ReadEventsAsync()
    {
        if (_read)
        {
            throw new InvalidOperationException("This stream can only be read once.");
        }

        if (_disposed || _channel.isCompleted)
        {
            throw new ObjectDisposedException(nameof(MqttEventStream<TMessage>));
        }

        _read = true;
        return new EnumerateMessages<object>(
            _channel,
            s => _messageSerializer.Deserialize<TMessage>(s)!);
    }

    public async ValueTask DisposeAsync()
    {
        if (!_disposed)
        {
            await _channel.CancleAsync().ConfigureAwait(false);
            _disposed = true;
        }
    }

    private sealed class EnumerateMessages<T> : IAsyncEnumerable<T>
    {
        private readonly MqttSubscribeChannel _channel;
        private readonly Func<string, T> _messageSerializer;

        public EnumerateMessages(
            MqttSubscribeChannel channel,
            Func<string, T> messageSerializer)
        {
            _channel = channel;
            _messageSerializer = messageSerializer;
        }

        public async IAsyncEnumerator<T> GetAsyncEnumerator(
            CancellationToken cancellationToken = default)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var message = await _channel.ReadAsync(cancellationToken).ConfigureAwait(false);
                string body = message;

                if (body.Equals(MqttPubSub.Completed, StringComparison.Ordinal))
                {
                    yield break;
                }

                yield return _messageSerializer(message);
            }
        }
    }
}
