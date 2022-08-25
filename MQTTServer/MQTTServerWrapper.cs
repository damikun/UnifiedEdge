using MQTTnet.Server;
using MQTTnet.Adapter;
using MQTTnet.Diagnostics;

namespace Server
{

    public class MQTTServerWrapper : MqttServer
    {
        private readonly MqttServerOptions Options;
        public MQTTServerWrapper(
            MqttServerOptions options,
            IEnumerable<IMqttServerAdapter> adapters,
            IMqttNetLogger logger)
            : base(options, adapters, logger)
        {
            Options = options;
        }
    }
}