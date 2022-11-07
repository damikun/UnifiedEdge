using MQTTnet.Server;

namespace Server.Mqtt
{
    public interface IMqttServerFactory
    {
        public MQTTnet.Server.MqttServer CreateMQTTServer(MqttServerOptions? options);
    }
}