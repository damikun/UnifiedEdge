using Server.Mqtt.DTO;
using HotChocolate.Execution;

namespace Aplication.Graphql
{

    public class MessageSourceStreamFilter<T>
        : ISourceStream<T> where T : GQL_MqttMessage
    {
        private readonly ISourceStream<T> _stream;

        private volatile bool disposing = false;

        private readonly string? _filter_client_uid;

        private readonly string? _filter_topic_uid;

        public MessageSourceStreamFilter(
            ISourceStream<T> stream,
            string? client_uid,
            string? topic_uid
        )
        {
            _stream = stream;
            _filter_client_uid = client_uid;
            _filter_topic_uid = topic_uid;
        }

        public ValueTask DisposeAsync()
        {
            disposing = true;

            return _stream.DisposeAsync();
        }

        public async IAsyncEnumerable<T> ReadEventsAsync()
        {
            var m_event = _stream.ReadEventsAsync();

            bool is_topic = _filter_topic_uid is not null;
            bool is_client = _filter_client_uid is not null;

            await foreach (var message in m_event)
            {
                if (disposing)
                {
                    break;
                }

                if (message is null)
                {
                    continue;
                }

                if (is_topic && is_client)
                {
                    if (message.ClientUid is not null && message.TopicUid is not null)
                    {
                        if (message.ClientUid.Equals(_filter_client_uid, StringComparison.OrdinalIgnoreCase) &&
                            message.TopicUid.Equals(_filter_topic_uid, StringComparison.OrdinalIgnoreCase)
                        )
                        {
                            yield return message;
                        }
                    }

                }
                else if (is_client && !is_topic)
                {
                    if (message.ClientUid is not null)
                    {
                        if (message.ClientUid.Equals(_filter_client_uid, StringComparison.OrdinalIgnoreCase))
                        {
                            yield return message;
                        }
                    }
                }
                else if (!is_client && is_topic)
                {
                    if (message.TopicUid is not null)
                    {
                        if (message.TopicUid.Equals(_filter_topic_uid, StringComparison.OrdinalIgnoreCase))
                        {
                            yield return message;
                        }
                    }
                }
                else
                {
                    yield return message;
                }

                continue;
            }
        }

        IAsyncEnumerable<object> ISourceStream.ReadEventsAsync()
        {
            return ReadEventsAsync();
        }
    }
}