using Server.Mqtt;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager : ServerManager
    {

        public MqttServerManager(IServerStore? store = null) : base(store!)
        {

        }

        public override Task<IServer> CreateServerInstance(IServerCfg cfg)
        {
            return Task.FromResult(
                new EdgeMqttServer(cfg) as IServer
            );
        }
    }
}