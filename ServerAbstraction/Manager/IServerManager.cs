
namespace Server.Manager
{
    public interface IServerManager
    {
        public Task<IServer> CreateServerInstance(IServerCfg cfg);

        public Task<string> RemoveServer(string server_id, CancellationToken ct = default);

        public Task<string?> AddServer(IServer server);

        public Task<IServer> UpdateServer(IServerCfg cfg, CancellationToken ct = default);

        public Task<bool> Any();

        public Task<bool> Contains(string server_id);

        public Task<ServerState> State(string server_id);

        public Task<TimeSpan?> ServerUptime(string server_id);

        public Task<ServerState> ProcesCommand(string server_id, ServerCmd cmd, CancellationToken ct = default);
    }
}