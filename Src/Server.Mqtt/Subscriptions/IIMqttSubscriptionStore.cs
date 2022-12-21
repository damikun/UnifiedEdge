
namespace Server.Mqtt.Subscriptions
{
    public interface IMqttSubscriptionStore
    {
        HashSet<string> CheckSubscriptions(string topic);

        Task Unsubscribe(string sub_uid);

        Task UnsubscribeAll();

        Task<MqttTopicSubscription> CreateSubscription(string topic);

        ICollection<MqttTopicSubscription> GetSubscriptions(HashSet<string> subs);
    }
}