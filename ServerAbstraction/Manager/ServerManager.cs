using System.Transactions;

namespace Server.Manager
{

    public abstract class ServerManager<T> : IServerManager where T : IServer
    {
        private readonly IServerStore _runtime_store;

        public ServerInfo ManagedServerInfo { get; } = T.Info;

        public ServerManager(IEndpointService endpoint, IServerStore? store = null)
        {
            if (store == null)
                store = new ServerInMemoryStore();

            _runtime_store = store;
        }

        public async Task<ServerState> ProcesCommand(
            string server_id,
            ServerCmd cmd,
            CancellationToken ct = default
        )
        {
            IServer server = await GetAndValidateServerInternal(server_id);

            return await server?.Handle(cmd, ct)!;
        }

        public async Task<string> RemoveServer(
            string server_id,
            CancellationToken ct = default
        )
        {
            IServer server = await GetAndValidateServerInternal(server_id);

            using (TransactionScope scope = new TransactionScope())
            {
                try
                {
                    await _runtime_store.Remove(server_id);

                    scope.Complete();
                }
                catch { }

                try
                {
                    await server.Handle(ServerCmd.stop, ct);
                }
                catch { }

                return server_id;
            }
        }

        public Task<bool> Any()
        {
            return _runtime_store.Any();
        }

        internal async Task<IServer?> GetServer(string server_id)
        {
            return await _runtime_store.GetById(server_id);
        }

        public async Task<string?> AddServer(IServer server)
        {
            var added_server = await _runtime_store.AddServer(server);

            return added_server?.UID;
        }

        public async Task<ServerState> State(string server_id)
        {
            try
            {
                IServer server = await GetAndValidateServerInternal(server_id);

                return server.State;
            }
            catch
            {
                return ServerState.undefined;
            }

        }

        public Task<bool> Contains(string server_id)
        {
            return _runtime_store.Contains(server_id);
        }

        public async Task<TimeSpan?> ServerUptime(string server_id)
        {
            var server = await _runtime_store.GetById(server_id);

            return server?.Uptime;
        }

        public async Task<IServer> UpdateServer(
            IServerCfg server_cfg,
            CancellationToken ct = default)
        {
            if (server_cfg == null)
            {
                throw new ArgumentNullException(nameof(server_cfg));
            }

            if (string.IsNullOrEmpty(server_cfg.Server_UID))
            {
                throw new ArgumentNullException(nameof(server_cfg.Server_UID));
            }

            var server = await GetServer(server_cfg.Server_UID);

            if (server == null)
            {
                throw ServerNotFound(server_cfg.Server_UID);
            }
            else
            {
                server.SetConfiguration(server_cfg);
            }

            return server;
        }

        private async Task<IServer> GetAndValidateServerInternal(string server_id)
        {
            IServer? server = await _runtime_store?.GetById(server_id)!;

            if (server == null)
            {
                throw ServerNotFound(server_id);
            }
            else
            {
                return server as IServer;
            }
        }

        private Exception ServerNotFound(string server_id)
        {
            return new Exception(
                string.Format(
                    "Server with id: {0} was not found",
                    server_id
                )
            );
        }

        protected abstract T CreateServerInstance(IServerCfg cfg);

        public IServer CreateServer(IServerCfg cfg)
        {
            return CreateServerInstance(cfg) as IServer;
        }

    }
}