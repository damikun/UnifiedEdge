using AutoMapper;
using Server.Mqtt.DTO;
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

        sub.OnMessageEvent += async (sender, args) =>
        {
            await channel.WriteAsync(_mapper.Map<GQL_MqttMessage>(args.Message), default);
        };

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