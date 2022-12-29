using AutoMapper;
using Server.Mqtt.DTO;
using HotChocolate.Execution;

namespace Aplication.Extensions.Mqtt;

public class MqttEventStream : ISourceStream<GQL_MqttMessage>
{
    private readonly MqttSubscribeChannel _channel;

    private readonly IMapper _mapper;

    private bool _read;
    private bool _disposed;

    public MqttEventStream(MqttSubscribeChannel channel, IMapper mapper)
    {
        _channel = channel;

        _mapper = mapper;
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
        return new EnumerateMessages(_channel, _mapper);
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
        return new EnumerateMessages(_channel, _mapper);
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

        private readonly IMapper _mapper;

        public EnumerateMessages(MqttSubscribeChannel channel, IMapper mapper)
        {
            _channel = channel;

            _mapper = mapper;
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

                yield return _mapper.Map<GQL_MqttMessage>(message.Body);
            }
        }
    }
}
