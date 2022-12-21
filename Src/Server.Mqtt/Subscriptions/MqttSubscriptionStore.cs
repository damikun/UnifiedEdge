using MQTTnet;
using MQTTnet.Server;
using System.Collections.Concurrent;

namespace Server.Mqtt.Subscriptions
{

    public class InMemoryMqttSubscriptionStore
        : IMqttSubscriptionStore
    {

        readonly ConcurrentDictionary<string, MqttTopicSubscription> _subscriptions = new();

        readonly ConcurrentDictionary<ulong, HashMaskSubscriptionsCollection> _subscriptions_with_hash = new();

        readonly ConcurrentDictionary<ulong, ConcurrentDictionary<string, MqttTopicSubscription>> _subscriptions_with_no_hash = new();

        private readonly EdgeMqttServer Server;

        public InMemoryMqttSubscriptionStore(EdgeMqttServer server)
        {
            Server = server;
        }

        public ICollection<MqttTopicSubscription> GetSubscriptions(HashSet<string> subs)
        {
            return _subscriptions.Where(e => subs.Contains(e.Key)).Select(e => e.Value).ToList();
        }

        public HashSet<string> CheckSubscriptions(string topic)
        {
            var possibleSubscriptions = new List<MqttTopicSubscription>();

            MqttSubscription.CalculateTopicHash(
                topic,
                out var topicHash,
                out var hashMask,
                out var hasWildcard
            );

            HashSet<string>? subscriptionIdentifiers = new();

            if (_subscriptions_with_no_hash.TryGetValue(topicHash, out var noWildcardSubscriptions))
            {
                possibleSubscriptions.AddRange(noWildcardSubscriptions.Values);
            }

            foreach (var wcs in _subscriptions_with_hash)
            {
                var subscriptionHash = wcs.Key;
                var subscriptionsByHashMask = wcs.Value.SubscriptionsByHashMask;
                foreach (var shm in subscriptionsByHashMask)
                {
                    var subscriptionHashMask = shm.Key;
                    if ((topicHash & subscriptionHashMask) == subscriptionHash)
                    {
                        var subscriptions = shm.Value;
                        possibleSubscriptions.AddRange(subscriptions.Values);
                    }
                }
            }

            if (possibleSubscriptions.Count == 0)
            {
                return subscriptionIdentifiers;
            }

            foreach (var subscription in possibleSubscriptions)
            {

                if (MqttTopicFilterComparer.Compare(topic, subscription.Topic) != MqttTopicFilterCompareResult.IsMatch)
                {
                    continue;
                }

                if (subscription.Id is not null)
                {
                    subscriptionIdentifiers.Add(subscription.Id);
                }

            }

            return subscriptionIdentifiers;
        }

        public readonly SemaphoreSlim _removeGate = new(1);

        public async Task UnsubscribeAll()
        {
            try
            {
                await _removeGate.WaitAsync().ConfigureAwait(false);

                foreach (var sub in _subscriptions.Values)
                {
                    try
                    {
                        sub.ClearHandlers();
                    }
                    catch { }

                }

                _subscriptions.Clear();
                _subscriptions_with_hash.Clear();
                _subscriptions_with_no_hash.Clear();
            }
            finally
            {
                _removeGate.Release();
            }

        }
        public async Task Unsubscribe(string sub_uid)
        {
            if (string.IsNullOrWhiteSpace(sub_uid))
            {
                return;
            }

            _subscriptions.TryGetValue(sub_uid, out var existingSubscription);

            if (existingSubscription is null)
            {
                return;
            }

            var topicHash = existingSubscription.TopicHash;

            try
            {
                await _removeGate.WaitAsync().ConfigureAwait(false);


                if (existingSubscription.TopicHasWildcard)
                {
                    if (_subscriptions_with_hash.TryGetValue(topicHash, out var subscriptions))
                    {
                        await subscriptions.RemoveSubscription(existingSubscription);

                        // Is this cleanup needed?
                        if (subscriptions.SubscriptionsByHashMask.Count == 0)
                        {
                            _subscriptions_with_hash.TryRemove(topicHash, out HashMaskSubscriptionsCollection? subs);
                        }
                    }
                }
                else
                {
                    if (_subscriptions_with_no_hash.TryGetValue(topicHash, out var subscriptions))
                    {
                        subscriptions.TryRemove(existingSubscription.Id, out MqttTopicSubscription? value);
                        if (subscriptions.Count == 0)
                        {
                            _subscriptions_with_no_hash.Remove(topicHash, out ConcurrentDictionary<string, MqttTopicSubscription>? dic);
                        }
                    }
                }

                _subscriptions.Remove(sub_uid, out MqttTopicSubscription? sub);

                sub = null;
            }
            finally
            {
                _removeGate.Release();
            }

        }

        public async Task<MqttTopicSubscription> CreateSubscription(
            string topic
        )
        {
            var sub = new MqttTopicSubscription(topic);

            _subscriptions[sub.Id] = sub;

            if (sub.TopicHasWildcard)
            {
                if (!_subscriptions_with_hash.TryGetValue(sub.TopicHash, out var subscriptions))
                {
                    subscriptions = new HashMaskSubscriptionsCollection();
                    _subscriptions_with_hash.TryAdd(sub.TopicHash, subscriptions);
                }

                await subscriptions.AddSubscription(sub);
            }
            else
            {
                if (!_subscriptions_with_no_hash.TryGetValue(sub.TopicHash, out var subscriptions))
                {
                    subscriptions = new ConcurrentDictionary<string, MqttTopicSubscription>();
                    _subscriptions_with_no_hash.TryAdd(sub.TopicHash, subscriptions);
                }

                subscriptions.TryAdd(sub.Id, sub);
            }

            return sub;
        }

        public async Task Publish(InjectedMqttApplicationMessage message, CancellationToken ct)
        {
            if (Server is not null &&
                Server.Server is not null &&
                await Server.IsRunning()
            )
            {
                await Server.Server.InjectApplicationMessage(message, ct);
            }
            else
            {
                throw new Exception("Server is not running");
            }
        }
    }

    public sealed class HashMaskSubscriptionsCollection
    {
        public ConcurrentDictionary<ulong, ConcurrentDictionary<string, MqttTopicSubscription>> SubscriptionsByHashMask { get; } = new();

        private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        public async Task AddSubscription(MqttTopicSubscription subscription)
        {
            try
            {
                await _semaphore.WaitAsync().ConfigureAwait(false); ;

                if (!SubscriptionsByHashMask.TryGetValue(subscription.TopicHashMask, out var subscriptions))
                {
                    subscriptions = new ConcurrentDictionary<string, MqttTopicSubscription>();
                    SubscriptionsByHashMask.TryAdd(subscription.TopicHashMask, subscriptions);
                }

                if (subscriptions.TryAdd(subscription.Id, subscription))
                {
                    await Task.Delay(1);
                    subscriptions.TryAdd(subscription.Id, subscription);
                }
            }
            finally
            {
                _semaphore.Release();
            }
        }

        public async Task RemoveSubscription(MqttTopicSubscription subscription)
        {
            try
            {
                await _semaphore.WaitAsync().ConfigureAwait(false);

                if (SubscriptionsByHashMask.TryGetValue(subscription.TopicHashMask, out var subscriptions))
                {
                    subscriptions.TryRemove(subscription.Id, out MqttTopicSubscription? removed);

                    removed = null;

                    // Is this realy needed ?
                    if (subscriptions.Count == 0)
                    {
                        SubscriptionsByHashMask
                        .TryRemove(
                            subscription.TopicHashMask,
                            out ConcurrentDictionary<string, MqttTopicSubscription>? value
                        );
                    }
                }

                // To be sure check using linq again...
                if (SubscriptionsByHashMask.Any(e => e.Value.ContainsKey(subscription.Id)))
                {
                    var subs = SubscriptionsByHashMask
                    .Where(e => e.Value.ContainsKey(subscription.Id))
                    .Select(e => e.Value)
                    .ToList();

                    foreach (var item in subs)
                    {
                        item.TryRemove(subscription.Id, out MqttTopicSubscription? removed);

                        removed = null;
                    }
                }
            }
            finally
            {
                _semaphore.Release();
            }
        }
    }
}