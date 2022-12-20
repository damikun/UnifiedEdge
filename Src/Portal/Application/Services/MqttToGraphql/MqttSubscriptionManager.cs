using Server.Manager.Mqtt;
using System.Collections.Concurrent;

namespace Aplication.Extensions.Mqtt;

public class MqttSubscriptionManager : IMqttSubscriptionManager, IDisposable
{
    private readonly IMqttServerManager _mqtt_manager;

    private readonly ConcurrentDictionary<string, MqttSubscribeChannel> _channels = new();

    public MqttSubscriptionManager(IMqttServerManager mqtt_manager)
    {
        _mqtt_manager = mqtt_manager;
    }

    public async ValueTask<MqttSubscribeChannel> SubscribeAsync(string server_uid, string topic)
    {
        var sub = await _mqtt_manager.Subscribe(server_uid, topic);

        var channel = new MqttSubscribeChannel(sub.Id, topic);

        _channels.TryAdd(sub.Id, channel);

        return channel;
    }

    public async ValueTask CancleSubscription(string server_uid, string uid)
    {
        try
        {
            await _mqtt_manager.Unsubscribe(server_uid, uid);
        }
        catch { }

        _channels.Remove(uid, out MqttSubscribeChannel? channel);

        if (channel is not null && !channel.isCompleted)
        {
            await channel.CancleAsync();
        }
    }

    public void Dispose()
    {
        try
        {
            if (_mqtt_manager is not null)
            {
                _mqtt_manager.UnsubscribeAll();
            }

            if (_channels is not null)
            {
                foreach (var channel in _channels.Values)
                {
                    try
                    {
                        channel.CancleAsync().GetAwaiter().GetResult();
                    }
                    catch
                    {
                        // dont care
                    }
                }

                _channels.Clear();
            }
        }
        catch { }
    }

    // public ValueTask Publish(string server_uid, string topic, string payload)
    // {
    //     throw new NotImplementedException();
    // }
}