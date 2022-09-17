using Server;
using Domain.Server;
using Server.Manager;
using Server.Manager.Mqtt;

namespace Aplication.Services.ServerFascade
{
    public interface IServerFascade
    {
        // public IServerManager Mqtt_manager { get; init; }

        // public IServerManager Opc_manager { get; init; }

        public T GetManager<T>() where T : IServerManager;

        public Task<IServer> CreateServer(ServerCfgBase db_cfg);

        public Task<string?> AddServer(IServer server);

        public Task<string?> AddServer(ServerCfgBase db_cfg);

        public Task<bool> Any(ServerType type);

        public Task<bool> Contains(string server_uid);

        public Task<ServerState> ProcesCommand(string server_uid, ServerCmd cmd, CancellationToken ct = default);

        public Task<string> RemoveServer(string server_uid, CancellationToken ct = default);

        public Task<TimeSpan?> ServerUptime(string server_uid);

        public Task<ServerState> State(string server_uid);

        public Task<IServer?> UpdateServer(ServerCfgBase db_cfg, CancellationToken ct = default);
    }
}