using MQTTnet.Server;

namespace Server.Manager
{
    public interface IMqttManager
    {
        public Task<string> RemoveService(string service_id);

        public Task<bool> Any();

        public Task<bool> Contains(string service_id);

        public Task<string?> AddServer(MqttServerOptions options, string? id = null);

        public Task<MqttState> State(string service_id);

    }
}