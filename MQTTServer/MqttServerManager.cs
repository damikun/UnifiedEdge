using Server.Mqtt;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager : ServerManager<EdgeMqttServer>, IMqttServerManager
    {

        public MqttServerManager(
            IEndpointService endpoint,
            IServerStore? store = null
        ) : base(endpoint, store!)
        {

        }

        protected override EdgeMqttServer CreateServerInstance(IServerCfg cfg)
        {
            return new EdgeMqttServer(cfg);
        }


    }
}