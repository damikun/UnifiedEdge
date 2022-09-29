using Server.Mqtt;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager : ServerManager<EdgeMqttServer>, IMqttServerManager
    {

        public readonly IServerEventPublisher _event_publisher;

        public MqttServerManager(
            IEndpointService endpoint,
            IServerEventPublisher event_publisher,
            IServerStore? store = null
        ) : base(endpoint, store!)
        {
            _event_publisher = event_publisher;
        }

        protected override EdgeMqttServer CreateServerInstance(IServerCfg cfg)
        {
            return new EdgeMqttServer(cfg, _event_publisher);
        }
    }
}