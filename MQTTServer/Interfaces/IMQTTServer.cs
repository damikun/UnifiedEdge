
using MQTTnet.Server;

namespace Server
{

    public interface IMQTTServer
    {
        public string ID { get; init; }

        public MqttState StateEnum { get; }

        public TimeSpan? Uptime { get; }

        public Task<IList<MqttClientStatus>> GetClientsAsync();

        internal Task Handle(MqttCommand command);

        internal Task StartAsync();

        internal Task StopAsync();

        internal Task RestartAsync();
    }
}