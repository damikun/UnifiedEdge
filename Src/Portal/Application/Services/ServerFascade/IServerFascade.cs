using Server;
using Domain.Server;
using Server.Manager;

namespace Aplication.Services.ServerFascade
{
    public interface IServerFascade
    {
        public List<string> SupportedServers { get; }

        public Task<IServerManager> GetManager(string server_uid);

        public IServerManager GetManager(ServerType type);

        public T GetManager<T>() where T : IServerManager;

        public Task<IServer> CreateServer(ServerCfgBase db_cfg);

        public IServerManager GetManagerByServerName(string display_name);

        public Task<string?> AddServer(string server_uid);

        public Task<string?> AddServer(IServer server);

        public Task<string?> AddServer(ServerCfgBase db_cfg);

        public Task<bool> Any(ServerType type);

        public Task<bool> Contains(string server_uid);

        public Task<bool> IsConfigMatch(string server_uid);

        public Task<ServerState> ProcesCommand(string server_uid, ServerCmd cmd, CancellationToken ct = default);

        public Task<string> RemoveServer(string server_uid, CancellationToken ct = default);

        public Task<TimeSpan?> ServerUptime(string server_uid);

        public Task<ServerState> State(string server_uid);

        public Task<IEnumerable<string>> GetManagedIds();

        public Task<IServer?> UpdateServer(ServerCfgBase db_cfg, CancellationToken ct = default);
    }
}