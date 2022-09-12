using MQTTnet.Server;
using Server.Commander;

namespace Server.Manager
{
    public interface IMqttManager
    {
        public Task<string> RemoveServer(string server_id);

        public Task<string?> AddServer(MqttServerOptions options, string? id = null);

        public Task<string?> UpdateServer(string server_id, MqttServerOptions options);

        public Task<bool> Any();

        public Task<bool> Contains(string server_id);

        public Task<MqttState> State(string server_id);

        public Task<TimeSpan?> ServerUptime(string server_id);

        public Task<ICmdResult> ProcesCommand(string server_id, MqttCommand cmd);
    }
}