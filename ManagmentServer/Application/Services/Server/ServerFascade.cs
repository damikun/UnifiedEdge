using Server;
using AutoMapper;
using Persistence;
using Domain.Server;
using Server.Manager;
using Server.Manager.Mqtt;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.ServerFascade
{

    public class ServerFascade : IServerFascade
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _provider;

        public ServerFascade(
            IMapper mapper,
            IServiceProvider provider,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _mapper = mapper;

            _factory = factory;

            _provider = provider;
        }

        private IEnumerable<IServerManager> GetManagers() => _provider.GetServices<IServerManager>();

        public T GetManager<T>() where T : IServerManager
        {
            var all_managers = GetManagers();

            var manager_services = all_managers
            .Where(e => e is T)
            .FirstOrDefault();

            if (manager_services is not null && manager_services is T typed)
            {
                return typed;
            }
            else
            {
                throw new Exception(
                    string.Format(
                        "Service `{0}` is not registred ove DI",
                        typeof(T).Name
                    )
                );
            }
        }

        public IServerManager GetManager(ServerType type)
        {
            switch (type)
            {
                case ServerType.mqtt: return GetManager<MqttServerManager>();

                default:
                    throw new Exception(
                        string.Format(
                            "Unssupported manager type of: {0}",
                            type.GetType().Name
                        )
                    );
            }
        }

        public async Task<IServerManager> GetManager(string server_uid)
        {
            var managers = GetManagers();

            foreach (var manager in managers)
            {
                if (await manager.Contains(server_uid))
                {
                    return manager;
                }
            }

            throw new Exception("Invalid server UID. Not present in any manager.");
        }

        public Task<IServer> CreateServer(ServerCfgBase db_cfg)
        {
            var server_cfg = _mapper.Map<Server.IServerCfg>(db_cfg);

            var m = GetManager(db_cfg.Type);

            return Task.FromResult(
                m.CreateServer(server_cfg)
            );
        }

        public async Task<string?> AddServer(ServerCfgBase db_cfg)
        {
            IServer s = await CreateServer(db_cfg);

            var m = GetManager(db_cfg.Type);

            return await m.AddServer(s);
        }

        public async Task<string?> AddServer(IServer server)
        {
            var m = await GetManager(server.UID);

            return await m.AddServer(server);
        }

        public Task<bool> Any(ServerType type)
        {
            var m = GetManager(type);

            return m.Any();
        }

        public async Task<bool> Contains(string server_uid)
        {
            var m = await GetManager(server_uid);

            return await m.Contains(server_uid);
        }

        public async Task<ServerState> ProcesCommand(
            string server_uid,
            ServerCmd cmd,
            CancellationToken ct = default)
        {
            var m = await GetManager(server_uid);

            return await m.ProcesCommand(server_uid, cmd, ct);
        }

        public async Task<string> RemoveServer(
            string server_uid,
            CancellationToken ct = default
        )
        {
            var m = await GetManager(server_uid);

            return await m.RemoveServer(server_uid, ct);
        }

        public async Task<TimeSpan?> ServerUptime(string server_uid)
        {
            var m = await GetManager(server_uid);

            return await m.ServerUptime(server_uid);
        }

        public async Task<ServerState> State(string server_uid)
        {
            var m = await GetManager(server_uid);

            return await m.State(server_uid);
        }

        public async Task<IServer?> UpdateServer(
            ServerCfgBase db_cfg,
            CancellationToken ct = default)
        {
            var server_cfg = _mapper.Map<Server.IServerCfg>(db_cfg);

            var m = await GetManager(db_cfg.ServerUID);

            return await m.UpdateServer(server_cfg, ct);
        }

    }
}