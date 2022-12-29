using AutoMapper;
using Server.Manager.Mqtt;
using System.Collections.Concurrent;

namespace Aplication.Extensions.Mqtt;

public class MqttSubscriptionManager : IMqttSubscriptionManager, IDisposable
{
    private readonly IMqttServerManager _mqtt_manager;

    private readonly IMapper _mapper;

    private readonly ConcurrentDictionary<string, MqttSubscribeChannel> _channels = new();

    public MqttSubscriptionManager(
        IMqttServerManager mqtt_manager,
        IMapper mapper
    )
    {
        _mapper = mapper;
        _mqtt_manager = mqtt_manager;
    }

    public async ValueTask<MqttSubscribeChannel> SubscribeAsync(string server_uid, string topic)
    {
        var sub = await _mqtt_manager.Subscribe(server_uid, topic);

        var channel = new MqttSubscribeChannel(sub.Id, topic, server_uid, this);

        sub.OnMessageEvent += (sender, args) =>
        {
            channel.WriteAsync(args.Message, default);
        };

        _channels.TryAdd(sub.Id, channel);

        return channel;
    }

    public async ValueTask CancleSubscription(string server_uid, string sub_uid)
    {
        try
        {
            await _mqtt_manager.Unsubscribe(server_uid, sub_uid);
        }
        catch { }

        _channels.Remove(sub_uid, out MqttSubscribeChannel? channel);

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
                try
                {
                    _mqtt_manager.UnsubscribeAll();
                }
                catch
                {

                }
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
}