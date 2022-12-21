using MQTTnet.Server;
using Server.Mqtt.DTO;

namespace Server.Mqtt.Subscriptions
{

    public class MqttTopicSubscription
    {
        public MqttTopicSubscription(string topic)
        {
            Id = Guid.NewGuid().ToString();
            Topic = topic;

            MqttSubscription.CalculateTopicHash(
                topic,
                out var hash,
                out var hashMask,
                out var hasWildcard
            );

            TopicHash = hash;
            TopicHashMask = hashMask;
            TopicHasWildcard = hasWildcard;
        }

        public string Id { get; init; }

        public string Topic { get; }

        public ulong TopicHash { get; }

        public ulong TopicHashMask { get; }

        public bool TopicHasWildcard { get; }

        public event EventHandler<MqttSubMessageArgs> OnMessageEvent;

        protected internal virtual void ClearHandlers()
        {
            if (OnMessageEvent is not null)
            {
                foreach (EventHandler<MqttSubMessageArgs> handler in OnMessageEvent.GetInvocationList())
                {
                    OnMessageEvent -= handler;
                }
            }
        }
        protected internal virtual void HandleMessage(MqttSubMessageArgs args)
        {
            if (OnMessageEvent is not null)
            {
                try
                {
                    OnMessageEvent?.Invoke(this, args);
                }
                catch { }
            }
        }
    }

    public class MqttSubMessageArgs : EventArgs
    {
        public DTO_MqttMessage Message { get; init; }
    }


}