using Server.Mqtt.DTO;
using System.Collections.Concurrent;

namespace Server.Mqtt
{
    public interface ITopicStore
    {
        event EventHandler<TopicEventArgs> OnNewTopic;

        event EventHandler<TopicClearEventArgs> OnClear;

        event EventHandler<TopicEventArgs> OnTopicIncrement;

        DTO_MqttTopic? AddTopic(string Topic);

        DTO_MqttTopicStats? GetTopicStats(string TopicUid);

        List<DTO_MqttTopic> GetTopics();

        int GetTopicsCount();

        bool Contains(string topicUid);

        bool ContainsTopic(string topic);

        void IncrementTopicStatCount(string topic);
    }

    public class TopicStore : ITopicStore
    {
        public event EventHandler<TopicEventArgs> OnNewTopic;

        public event EventHandler<TopicClearEventArgs> OnClear;

        public event EventHandler<TopicEventArgs> OnTopicIncrement;

        private readonly ConcurrentDictionary<string, MqttStoredTopic> _store;

        private volatile EdgeMqttServer _server;

        public TopicStore(EdgeMqttServer server)
        {
            if (server is null)
            {
                throw new ArgumentNullException(nameof(server));
            }

            _server = server;

            _store = new ConcurrentDictionary<string, MqttStoredTopic>();
        }

        public DTO_MqttTopic? AddTopic(string topic)
        {
            if (topic is null || this._server == null)
            {
                return null;
            }

            var topic_obj = new MqttStoredTopic()
            {
                ServerUid = this._server.UID,
                Topic = topic,
            };

            try
            {
                var stored = _store.GetOrAdd(topic_obj.Uid, e => topic_obj);

                ReisOnNewTopic(stored);

                return new DTO_MqttTopic(stored);
            }
            catch
            {
                return null;
            }

        }

        public int GetTopicsCount() => _store.Count();

        protected void ClearTopics()
        {
            var topic_uids = _store.Keys.ToList();

            _store.Clear();

            ReisOnClear(topic_uids);
        }

        protected void ClearTopicStats(string topicUid)
        {
            if (Contains(topicUid))
            {
                var topic_obj = _store[topicUid];
            }
        }

        public void IncrementTopicStatCount(string topic)
        {
            if (!ContainsTopic(topic))
            {
                var result = AddTopic(topic);

                if (result is null)
                {
                    return;
                }
            }

            try
            {
                var topic_obj = _store.Values.Where(
                    e => e is not null && e.Topic is not null &&
                    e.Topic.Equals(topic, StringComparison.OrdinalIgnoreCase)
                ).FirstOrDefault();

                if (topic_obj is not null)
                {
                    topic_obj.Stats.IncrementMessagesCount();

                    ReisOnTopicIncrement(topic_obj);
                }
            }
            catch { }
        }

        public DTO_MqttTopicStats? GetTopicStats(string topicUid)
        {
            if (!_store.ContainsKey(topicUid))
            {
                return null;
            }

            var topic = _store[topicUid];

            return new DTO_MqttTopicStats(topic.Stats);
        }

        public bool Contains(string topicUid)
        {
            return _store.ContainsKey(topicUid);
        }

        public bool ContainsTopic(string topic)
        {
            return _store.Values.
            Where(e => e is not null && e.Topic is not null)
            .Any(e => e.Topic.Equals(topic, StringComparison.OrdinalIgnoreCase));
        }

        public List<DTO_MqttTopic> GetTopics()
        {
            var topics = _store.Values
            .Where(e => e is not null)
            .Select(e => new DTO_MqttTopic()
            {
                ServerUid = e.ServerUid,
                Topic = e.Topic,
                Stats = new DTO_MqttTopicStats()
                {
                    MessagesCount = e.Stats.MessagesCount,
                    Uid = e.Stats.Uid
                },
                Uid = e.Uid
            }).ToList();

            if (topics is null)
            {
                return new List<DTO_MqttTopic>();
            }

            return topics;
        }


        private void ReisOnNewTopic(MqttStoredTopic topic)
        {
            EventHandler<TopicEventArgs> raiseEvent = OnNewTopic;

            if (raiseEvent != null)
            {
                var dto = new DTO_MqttTopic(topic);

                var args = new TopicEventArgs(dto);

                try
                {
                    raiseEvent.Invoke(this, args);
                }
                catch { }
            }
        }


        private void ReisOnClear(List<string> topics_uids)
        {
            EventHandler<TopicClearEventArgs> raiseEvent = OnClear;

            var args = new TopicClearEventArgs(topics_uids);

            if (raiseEvent != null)
            {
                try
                {
                    raiseEvent.Invoke(this, args);
                }
                catch { }
            }
        }

        private void ReisOnTopicIncrement(MqttStoredTopic topic)
        {
            EventHandler<TopicEventArgs> raiseEvent = OnTopicIncrement;

            if (raiseEvent != null)
            {
                var dto = new DTO_MqttTopic(topic);

                var args = new TopicEventArgs(dto);

                try
                {
                    raiseEvent.Invoke(this, args);
                }
                catch { }
            }
        }

    }

    public class TopicEventArgs : EventArgs
    {
        public TopicEventArgs(DTO_MqttTopic topic)
        {
            Topic = topic;
        }

        public DTO_MqttTopic Topic { get; set; }
    }

    public class TopicClearEventArgs : EventArgs
    {
        public TopicClearEventArgs(List<string> topic)
        {
            Topic = topic;
        }

        public List<string> Topic { get; set; }
    }

}