
namespace Server.Manager
{
    public interface IServerManager<T> : IServerManager
    {

    }

    public interface IServerManager
    {

        public ServerInfo ManagedServerInfo { get; }

        public void ValidateConfiguration(IServerCfg cfg);

        public IServer CreateServer(IServerCfg cfg);

        public Task<string> RemoveServer(string server_id, CancellationToken ct = default);

        public Task<string?> AddServer(IServer server);

        public Task EnableLogging(string server_uid, bool enable);

        public Task<IServer> UpdateServer(IServerCfg cfg, CancellationToken ct = default);

        public Task<bool> Any();

        public Task<List<string>> GetManagedServerIds();

        public Task<bool> IsConfigMatch(string server_uid);

        public Task<ServerConfigState> ServerConfigState(string server_id);

        public Task<bool> Contains(string server_id);

        public Task<ServerState> State(string server_id);

        public Task<TimeSpan?> ServerUptime(string server_id);

        public Task<ServerState> ProcesCommand(string server_id, ServerCmd cmd, CancellationToken ct = default);
    }
}