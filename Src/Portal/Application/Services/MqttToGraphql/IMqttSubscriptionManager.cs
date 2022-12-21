namespace Aplication.Extensions.Mqtt;

public interface IMqttSubscriptionManager
{
    ValueTask<MqttSubscribeChannel> SubscribeAsync(string server_uid, string topic);

    ValueTask CancleSubscription(string server_uid, string uid);
}
