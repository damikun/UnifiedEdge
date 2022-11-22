using AutoMapper;
using Server.Mqtt.DTO;
using System.Threading.Channels;
using System.Collections.Concurrent;
using AutoMapper.QueryableExtensions;


namespace Server.Mqtt
{
    public interface IMessageStore
    {
        event EventHandler<MessageEventArgs> OnNewMessage;

        event EventHandler<MessageClearEventArgs> OnClear;

        void AddMessage(MqttStoredMessage Message);

        ICollection<DTO_MqttMessage> GetTopicRecentMessages(string topicUid);

        ICollection<DTO_MqttMessage> GetClientRecentMessages(string topicUid);

        ICollection<DTO_MqttMessage> GetRecentMessages();

        DTO_MqttMessage? GetMessageByUid(string messageUid);

        long GetMessagesCount();

        bool Contains(string messageUid);

        bool Contains(DTO_MqttMessage messageUid);

        void Dispose();
    }

    public class MessageStore : IMessageStore, IDisposable
    {
        public event EventHandler<MessageEventArgs> OnNewMessage;

        public event EventHandler<MessageClearEventArgs> OnClear;

        private readonly ConcurrentBag<MqttStoredMessage> _store;

        public readonly Channel<MqttStoredMessage> _queue;

        private volatile EdgeMqttServer _server;

        public const int QUEUE_SIZE = 5000;

        public const int Recent_SIZE = 100;

        private Task _worker;

        CancellationTokenSource cts = new CancellationTokenSource();

        public MessageStore(EdgeMqttServer server)
        {
            if (server is null)
            {
                throw new ArgumentNullException(nameof(server));
            }

            _server = server;

            _store = new ConcurrentBag<MqttStoredMessage>();

            _queue = CreateChannel(QUEUE_SIZE);

            _worker = CreateWorker(cts.Token);
        }

        private Task CreateWorker(CancellationToken ct)
        {
            return Task.Run(async () => await MessageWorkerTask(ct));
        }

        private async Task MessageWorkerTask(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                await _queue.Reader.WaitToReadAsync(token);

                var i = await _queue.Reader.ReadAsync(token);

                if (token.IsCancellationRequested)
                {
                    break;
                }

                if (i is not null && i.Uid is not null)
                {
                    try
                    {
                        _store.Add(i);

                        ReisOnNewMessage(i);
                    }
                    catch { }
                }
            }
        }

        private Channel<MqttStoredMessage> CreateChannel(int queue_size)
        {
            var options = new BoundedChannelOptions(queue_size);

            options.FullMode = BoundedChannelFullMode.DropWrite;
            options.SingleReader = false;
            options.SingleWriter = false;

            return Channel.CreateBounded<MqttStoredMessage>(options);
        }

        public void AddMessage(MqttStoredMessage Message)
        {

            if (Message is null || string.IsNullOrWhiteSpace(Message.Uid))
            {
                return;
            }

            if (cts.IsCancellationRequested)
            {
                return;
            }


            if (!_queue.Writer.TryWrite(Message))
            {
                // Is full 
            }

        }

        MapperConfiguration configuration = new MapperConfiguration(cfg =>
        cfg.CreateProjection<MqttStoredMessage, DTO_MqttMessage>());

        public ICollection<DTO_MqttMessage> GetRecentMessages()
        {
            if (cts.IsCancellationRequested)
            {
                return new List<DTO_MqttMessage>();
            }

            return _store
            .OrderBy(e => e.TimeStamp)
            .Take(Recent_SIZE)
            .AsQueryable()
            .ProjectTo<DTO_MqttMessage>(configuration)
            .ToList();
        }

        public ICollection<DTO_MqttMessage> GetTopicRecentMessages(string topicUid)
        {
            if (string.IsNullOrWhiteSpace(topicUid) || cts.IsCancellationRequested)
            {
                return new List<DTO_MqttMessage>();
            }

            return _store
            .Where(e => e.TopicUid != null && e.TopicUid.Equals(topicUid, StringComparison.OrdinalIgnoreCase))
            .OrderBy(e => e.TimeStamp)
            .Take(Recent_SIZE)
            .AsQueryable()
            .ProjectTo<DTO_MqttMessage>(configuration)
            .ToList();
        }

        public ICollection<DTO_MqttMessage> GetClientRecentMessages(string clientUid)
        {
            if (string.IsNullOrWhiteSpace(clientUid) || cts.IsCancellationRequested)
            {
                return new List<DTO_MqttMessage>();
            }

            return _store
            .Where(e => e.ClientUid != null && e.ClientUid.Equals(clientUid, StringComparison.OrdinalIgnoreCase))
            .OrderBy(e => e.TimeStamp)
            .Take(Recent_SIZE)
            .AsQueryable()
            .ProjectTo<DTO_MqttMessage>(configuration)
            .ToList();
        }

        public DTO_MqttMessage? GetMessageByUid(string messageUid)
        {
            if (string.IsNullOrWhiteSpace(messageUid) || cts.IsCancellationRequested)
            {
                return null;
            }

            return _store
            .Where(e => e.Uid.Equals(messageUid, StringComparison.OrdinalIgnoreCase))
            .OrderBy(e => e.TimeStamp)
            .AsQueryable()
            .ProjectTo<DTO_MqttMessage>(configuration)
            .FirstOrDefault();
        }

        public long GetMessagesCount()
        {
            if (cts.IsCancellationRequested)
            {
                return 0;
            }

            return _store.Count();
        }

        public bool Contains(string messageUid)
        {
            if (string.IsNullOrWhiteSpace(messageUid) || cts.IsCancellationRequested)
            {
                return false;
            }

            return _store.Any(e => e.Uid.Equals(messageUid, StringComparison.OrdinalIgnoreCase));
        }

        public bool Contains(DTO_MqttMessage message)
        {
            if (message is null)
            {
                return false;
            }

            return Contains(message.Uid);
        }

        private void ReisOnNewMessage(MqttStoredMessage message)
        {

            if (cts.IsCancellationRequested)
            {
                return;
            }

            EventHandler<MessageEventArgs> raiseEvent = OnNewMessage;

            if (raiseEvent != null)
            {
                var dto = new DTO_MqttMessage(message);

                var args = new MessageEventArgs(dto);

                try
                {
                    raiseEvent.Invoke(this, args);
                }
                catch { }
            }
        }

        public void Dispose()
        {
            cts.Cancel();
        }
    }


    public class MessageEventArgs : EventArgs
    {
        public MessageEventArgs(DTO_MqttMessage topic)
        {
            Message = topic;
        }

        public DTO_MqttMessage Message { get; set; }
    }

    public class MessageClearEventArgs : EventArgs
    {
        public MessageClearEventArgs(List<string> topic)
        {
            Message = topic;
        }

        public List<string> Message { get; set; }
    }
}