using Server.Mqtt.DTO;
using HotChocolate.Execution;

namespace Aplication.Extensions.Mqtt;

public class MqttEventStream : ISourceStream<GQL_MqttMessage>
{
    private readonly MqttSubscribeChannel _channel;
    private bool _read;
    private bool _disposed;

    public MqttEventStream(MqttSubscribeChannel channel)
    {
        _channel = channel;
    }

    public IAsyncEnumerable<GQL_MqttMessage> ReadEventsAsync()
    {
        if (_read)
        {
            throw new InvalidOperationException("This stream can only be read once.");
        }

        if (_disposed || _channel.isCompleted)
        {
            throw new ObjectDisposedException(nameof(MqttEventStream));
        }

        _read = true;
        return new EnumerateMessages(_channel);
    }

    IAsyncEnumerable<object> ISourceStream.ReadEventsAsync()
    {
        if (_read)
        {
            throw new InvalidOperationException("This stream can only be read once.");
        }

        if (_disposed || _channel.isCompleted)
        {
            throw new ObjectDisposedException(nameof(MqttEventStream));
        }

        _read = true;
        return new EnumerateMessages(_channel);
    }

    public async ValueTask DisposeAsync()
    {
        if (!_disposed)
        {
            try
            {
                await _channel.CancleAsync().ConfigureAwait(false);
            }
            catch (ObjectDisposedException ex)
            {

            }

            _disposed = true;
        }
    }

    private sealed class EnumerateMessages : IAsyncEnumerable<GQL_MqttMessage>
    {
        private readonly MqttSubscribeChannel _channel;
        public EnumerateMessages(MqttSubscribeChannel channel)
        {
            _channel = channel;
        }

        public async IAsyncEnumerator<GQL_MqttMessage> GetAsyncEnumerator(
            CancellationToken cancellationToken = default)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var message = await _channel
                .ReadAsync(cancellationToken)
                .ConfigureAwait(false);

                if (message is not null && message.Kind != HotChocolate.Subscriptions.MessageKind.Default)
                {
                    yield break;
                }

                if (message is null || message.Body is null)
                {
                    continue;
                }

                yield return message.Body;
            }
        }
    }
}
