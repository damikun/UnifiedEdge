using Server.Mqtt;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager : ServerManager<EdgeMqttServer>
    {

        public MqttServerManager(IServerStore? store = null) : base(store!)
        {

        }

        protected override EdgeMqttServer CreateServerInstance(IServerCfg cfg)
        {
            return new EdgeMqttServer(cfg);
        }
    }
}