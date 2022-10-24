
using System.Collections.Concurrent;

namespace Server.Mqtt
{
    public class MqttServerStats
    {
        private long _Subscriptions;

        private long _Connections;

        private long _PacketRcv;

        private long _PacketSnd;

        private long _NotConsumed;

        private readonly ConcurrentDictionary<string, long> _PublishedTopics = new ConcurrentDictionary<string, long>();

        private readonly ConcurrentDictionary<string, long> _SubscribedTopics = new ConcurrentDictionary<string, long>();


        public void ResetStats()
        {
            Interlocked.Exchange(ref _Subscriptions, 0);
            Interlocked.Exchange(ref _Connections, 0);
            Interlocked.Exchange(ref _PacketSnd, 0);
            Interlocked.Exchange(ref _PacketRcv, 0);
            Interlocked.Exchange(ref _NotConsumed, 0);

            _PublishedTopics.Clear();
            _SubscribedTopics.Clear();
        }

        public long PublishedTopicCount { get => _PublishedTopics.Count; }
        public long SubscribedTopicCount { get => _SubscribedTopics.Count; }
        public long SubscriptionsCount { get => Interlocked.Read(ref _Subscriptions); }
        public long ConnectionsCount { get => Interlocked.Read(ref _Connections); }
        public long PacketRcvCount { get => Interlocked.Read(ref _PacketRcv); }
        public long PacketSndCount { get => Interlocked.Read(ref _PacketSnd); }
        public long NotConsumedCount { get => Interlocked.Read(ref _NotConsumed); }

        public IReadOnlyDictionary<string, long> PublishedTopics
        {
            get
            {
                return _PublishedTopics.ToDictionary(e => e.Key, s => s.Value);
            }
        }

        public IReadOnlyDictionary<string, long> SubscibedTopics
        {
            get
            {
                return _SubscribedTopics.ToDictionary(e => e.Key, s => s.Value);
            }
        }

        public void ResetPublishTopicCount(string topic)
        {
            if (string.IsNullOrWhiteSpace(topic))
            {
                throw new ArgumentNullException(nameof(topic));
            }

            if (!_PublishedTopics.Any(e => e.Key == topic))
            {
                throw new Exception("Topic not found");
            }

            _PublishedTopics[topic] = 0;
        }


        protected internal void RecordInboundTopic(string topic)
        {
            if (string.IsNullOrWhiteSpace(topic))
            {
                return;
            }

            try
            {
                _PublishedTopics.AddOrUpdate(topic, 1, (key, old) => old + 1);

            }
            catch { }
        }

        protected internal void RecordTopicSubscribed(string topic)
        {
            if (string.IsNullOrWhiteSpace(topic))
            {
                return;
            }

            try
            {
                _SubscribedTopics.AddOrUpdate(topic, 1, (key, old) => old + 1);
            }
            catch { }
        }

        protected internal void RecordTopicUnsubscibed(string topic)
        {
            if (string.IsNullOrWhiteSpace(topic))
            {
                return;
            }
            try
            {
                _SubscribedTopics.AddOrUpdate(topic, 0, (key, old) => old >= 1 ? old - 1 : 0);
            }
            catch { }
        }

        protected internal void IncrementNotConsumedCount() => Interlocked.Increment(ref _NotConsumed);

        protected internal void IncrementSubscriptionsCount() => Interlocked.Increment(ref _Subscriptions);
        protected internal void DecremenSubscriptionsCount()
        {
            var value = Interlocked.Read(ref _Connections);

            if (value > 0)
            {
                Interlocked.Decrement(ref _Subscriptions);
            }

            if (value < 0)
            {
                Interlocked.Exchange(ref _Subscriptions, 0);
            }
        }

        protected internal void IncrementConnectionsCount() => Interlocked.Increment(ref _Connections);

        protected internal void DecrementConnectionsCount()
        {
            var value = Interlocked.Read(ref _Connections);

            if (value > 0)
            {
                Interlocked.Decrement(ref _Connections);
            }

            if (value < 0)
            {
                Interlocked.Exchange(ref _Connections, 0);
            }
        }

        protected internal void IncrementRcvCount() => Interlocked.Increment(ref _PacketRcv);

        protected internal void IncrementSndCount() => Interlocked.Increment(ref _PacketSnd);

    }
}