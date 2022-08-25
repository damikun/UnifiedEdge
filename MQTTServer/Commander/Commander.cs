
namespace Server.Commander
{
    internal sealed class MqttCommander : IMqttCommander
    {
        private readonly CommandQueue _queue_provider;

        public MqttCommander(CommandQueue queue_provider)
        {
            _queue_provider = queue_provider;
        }

        public async Task<ICmdResult> Process(string service_id, MqttCommand cmd)
        {
            var queue_item = await _queue_provider.AppendAsync(cmd, service_id);

            return queue_item.Result;
        }
    }
}