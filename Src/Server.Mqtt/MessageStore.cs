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

        ICollection<DTO_MqttMessage> GetClientRecentMessages(string clientUid);

        ICollection<DTO_MqttMessage> GetRecentMessages(string? clientUid, string? topicUid);

        ICollection<DTO_MqttMessage> GetRecentMessages();

        DTO_MqttMessage? GetMessageByUid(string messageUid);

        Task CleanOldMessages(CancellationToken ct);

        long GetMessagesCount();

        bool Contains(string messageUid);

        bool Contains(DTO_MqttMessage messageUid);

        void Dispose();
    }

    public class InMemoryMessageStore : IMessageStore, IDisposable
    {
        public event EventHandler<MessageEventArgs> OnNewMessage;

        public event EventHandler<MessageClearEventArgs> OnClear;

        private readonly ConcurrentBag<MqttStoredMessage> _store;

        public readonly Channel<MqttStoredMessage> _queue;

        private readonly SemaphoreSlim SyncClear = new SemaphoreSlim(1);

        private volatile EdgeMqttServer _server;

        public const int QUEUE_SIZE = 5000;

        public const int Recent_SIZE = 100;

        private Task _worker;

        CancellationTokenSource cts = new CancellationTokenSource();

        public InMemoryMessageStore(EdgeMqttServer server)
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
            DateTime nextclean = DateTime.Now.AddMinutes(2);

            while (!token.IsCancellationRequested)
            {
                if (nextclean < DateTime.Now)
                {
                    try
                    {
                        nextclean = DateTime.Now.AddMinutes(2);
                        await CleanOldMessages(token);

                    }
                    catch { }
                }

                await _queue.Reader.WaitToReadAsync(token);

                var i = await _queue.Reader.ReadAsync(token);

                if (token.IsCancellationRequested)
                {
                    break;
                }

                try
                {
                    await SyncClear
                    .WaitAsync(token)
                    .ConfigureAwait(false);

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
                finally
                {
                    SyncClear.Release();
                }

            }
        }

        private Channel<MqttStoredMessage> CreateChannel(int queue_size)
        {
            var options = new BoundedChannelOptions(queue_size);

            options.FullMode = BoundedChannelFullMode.DropWrite;
            options.SingleReader = true;
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
            cfg.CreateProjection<MqttStoredMessage, DTO_MqttMessage>()
        );

        public ICollection<DTO_MqttMessage> GetRecentMessages()
        {
            if (cts.IsCancellationRequested)
            {
                return new List<DTO_MqttMessage>();
            }

            return _store
            .OrderByDescending(e => e.TimeStamp)
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
            .Where(e =>
                e.TopicUid != null &&
                e.TopicUid.Equals(
                    topicUid,
                    StringComparison.OrdinalIgnoreCase
                )
            )
            .OrderByDescending(e => e.TimeStamp)
            .Take(Recent_SIZE)
            .AsQueryable()
            .ProjectTo<DTO_MqttMessage>(configuration)
            .ToList();
        }

        public async Task CleanOldMessages(CancellationToken ct)
        {
            try
            {
                await SyncClear
                .WaitAsync()
                .ConfigureAwait(false);

                var ordered = _store
                .Where(e => e is not null && e.Uid is not null)
                .OrderByDescending(e => e.TimeStamp)
                .ToList();

                if (ordered is null)
                    return;

                if (ordered.Count < Recent_SIZE)
                {
                    return;
                }

                var by_id = ordered
                .Take(Recent_SIZE)
                .Select(e => e.Uid);

                var by_topic_id = ordered
                .Where(e => e.TopicUid is not null)
                .GroupBy(e => e.TopicUid)
                .SelectMany(e => e.Take(Recent_SIZE).Select(e => e.Uid));

                var by_client_id = ordered
                .Where(e => e.ClientUid is not null)
                .GroupBy(e => e.ClientUid)
                .SelectMany(e => e.Take(Recent_SIZE).Select(e => e.Uid));

                var set = by_id
                .Concat(by_topic_id)
                .Concat(by_client_id)
                .ToHashSet();

                var memorised = ordered.Where(e => set.Contains(e.Uid));

                if (set.Count < Recent_SIZE)
                {
                    return;
                }

                _store.Clear();

                foreach (var message in memorised)
                {
                    _store.Add(message);
                }
            }
            finally
            {
                SyncClear.Release();
            }

            return;
        }

        public ICollection<DTO_MqttMessage> GetRecentMessages(
            string? clientUid,
            string? topicUid
        )
        {
            if (cts.IsCancellationRequested)
            {
                return new List<DTO_MqttMessage>();
            }

            bool client = !string.IsNullOrWhiteSpace(clientUid);
            bool topic = !string.IsNullOrWhiteSpace(topicUid);

            if (client && topic)
            {
                return _store
                .AsQueryable()
                .Where(e =>
                    e.ClientUid != null && e.ClientUid.Equals(clientUid, StringComparison.OrdinalIgnoreCase) &&
                    e.TopicUid != null && e.TopicUid.Equals(topicUid, StringComparison.OrdinalIgnoreCase)
                )
                .OrderByDescending(e => e.TimeStamp)
                .Take(Recent_SIZE)
                .ProjectTo<DTO_MqttMessage>(configuration)
                .ToList();
            }
            else if (client && !topic)
            {
                return _store
                .AsQueryable()
                .Where(e =>
                    e.ClientUid != null && e.ClientUid.Equals(clientUid, StringComparison.OrdinalIgnoreCase)
                )
                .OrderByDescending(e => e.TimeStamp)
                .Take(Recent_SIZE)
                .ProjectTo<DTO_MqttMessage>(configuration)
                .ToList();
            }
            else if (!client && topic)
            {
                return _store
                .AsQueryable()
                .Where(e =>
                    e.TopicUid != null && e.TopicUid.Equals(topicUid, StringComparison.OrdinalIgnoreCase)
                )
                .OrderByDescending(e => e.TimeStamp)
                .Take(Recent_SIZE)
                .ProjectTo<DTO_MqttMessage>(configuration)
                .ToList();
            }
            else if (!client && !topic)
            {
                return _store
                .AsQueryable()
                .OrderByDescending(e => e.TimeStamp)
                .Take(Recent_SIZE)
                .ProjectTo<DTO_MqttMessage>(configuration)
                .ToList();
            }

            return new List<DTO_MqttMessage>();
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