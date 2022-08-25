using MQTTnet.Server;

namespace Server
{

    public interface IMQTTServerFactory
    {

        public MQTTnet.Server.MqttServer CreateMQTTServer(MqttServerOptions? options);
    }

}