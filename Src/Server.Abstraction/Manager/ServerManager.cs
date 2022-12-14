using System.Transactions;

namespace Server.Manager
{

    public abstract class ServerManager<T> : IServerManager where T : IServer
    {
        private readonly IServerStore _runtime_store;

        public ServerInfo ManagedServerInfo { get; private set; }

        public ServerManager(IEndpointService endpoint, ServerInfo info, IServerStore? store = null)
        {
            ManagedServerInfo = info;

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

        public Task<List<string>> GetManagedServerIds()
        {
            return this._runtime_store.GetServerIds();
        }

        protected Task<IServer?> GetServer(string server_id)
        {
            return _runtime_store.GetById(server_id);
        }

        protected Task<IEnumerable<IServer>> GetAllServers()
        {
            return _runtime_store.GetAll();
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

        public void ValidateConfiguration(IServerCfg cfg)
        {
            // var method = typeof(T).GetMethod("ValidateServerConfig");
            // var func = (Action<IServerCfg>)Delegate.CreateDelegate(typeof(Action<IServerCfg>), null, method!);
            // func(cfg);
        }

        public async Task<bool> IsConfigMatch(string server_id)
        {
            IServer? server = await _runtime_store?.GetById(server_id)!;

            if (server == null)
            {
                throw ServerNotFound(server_id);
            }
            else
            {
                return server.isConfigMatch;
            }
        }

        public async Task<ServerConfigState> ServerConfigState(string server_id)
        {
            IServer? server = await _runtime_store?.GetById(server_id)!;

            if (server == null)
            {
                throw ServerNotFound(server_id);
            }
            else
            {
                return server.ConfigState();
            }
        }

        public async Task EnableLogging(string server_uid, bool enable)
        {
            var server = await GetServer(server_uid);

            if (server is not null)
            {
                await server.EnableLogging(enable);

                return;
            }
            else
            {
                throw new Exception("Server not found");
            }
        }
    }
}