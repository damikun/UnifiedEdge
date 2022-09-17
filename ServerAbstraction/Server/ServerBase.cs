
namespace Server
{

    public abstract class ServerBase : IServerBase
    {
        public string UID { get; init; }
        protected IServerCfg _config { get; private set; }

        public ServerBase(int MONITOR_PERIOD)
        {
            UID = UID ?? Guid.NewGuid().ToString();

            _monitor = new Timer(
                MonitorCallback!,
                this,
                MONITOR_PERIOD,
                MONITOR_PERIOD
            );
        }

        private Task? _current;

        public ServerState State { get; private set; } = ServerState.undefined;

        private SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        private readonly Timer _monitor;

        private DateTime? ServerStartTimestamp;

        private static async void MonitorCallback(object server)
        {
            try
            {
                if (server != null)
                {
                    await ((ServerBase)server).SyncServerState();
                }

            }
            catch { }
        }

        // Callback
        public abstract Task OnStateChanged();

        private async Task<ServerState> SetState(
            ServerState state,
            CancellationToken ct = default,
            bool in_background = false)
        {
            // Set state enum
            State = state;

            // Handle OnState
            _current = Task.Run(async () =>
            {
                await Task.Delay(100);
                await OnState();

            }, ct)
            .ContinueWith(async t =>
            {
                await SetState(ServerState.stopping, ct, false);
                await OnState();
            },
            TaskContinuationOptions.OnlyOnFaulted)
            .ContinueWith(t =>
            {
                // Finish
            },
            TaskContinuationOptions.NotOnFaulted);

            if (in_background)
            {
                await _current;
            }

            return State;
        }

        public TimeSpan? Uptime
        {
            get
            {
                SyncServerState();

                if (ServerStartTimestamp != null && State == ServerState.started)
                {
                    DateTime now = DateTime.Now;

                    if (now < ServerStartTimestamp)
                    {
                        ServerStartTimestamp = now;
                    }

                    return DateTime.Now.Subtract(((DateTime)ServerStartTimestamp));
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task<bool> IsRunning()
        {
            await SyncServerState();

            if (this.State == ServerState.started)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private async Task<ServerState> HandleServerCommand(
            ServerState state,
            CancellationToken ct = default
        )
        {
            if (_current != null && !_current.IsCompleted)
            {
                throw new Exception("Transition pending");
            }

            return await SetState(state, ct, true);
        }

        //----------------------------
        //----------------------------

        public async Task<ServerState> Handle(
            ServerCmd cmd,
            CancellationToken ct = default
        )
        {
            await _semaphore.WaitAsync(ct);

            if (_current != null && !_current.IsCompleted)
            {
                throw new Exception("Transition pending");
            }

            try
            {
                switch (cmd)
                {
                    case ServerCmd.start:
                        if (State == ServerState.stopped)
                        {
                            return await SetState(ServerState.starting, ct, true);
                        }
                        break;
                    case ServerCmd.stop:
                        if (State != ServerState.stopping)
                        {
                            return await SetState(ServerState.stopping, ct, true);
                        }
                        break;
                    case ServerCmd.restart:
                        if (State == ServerState.started)
                        {
                            return await SetState(ServerState.restarting, ct, true);
                        }
                        break;
                }

                return State;
            }
            finally
            {
                _semaphore.Release();
            }

        }

        //----------------------------
        //----------------------------

        private async Task OnState(CancellationToken ct = default)
        {
            switch (State)
            {
                case ServerState.undefined:
                    ServerStartTimestamp = null;
                    await OnAfterUndefined(ct);
                    await SetState(ServerState.stopped, ct);
                    break;
                case ServerState.started:
                    await OnAfterRunning(ct);
                    ServerStartTimestamp = DateTime.Now;
                    break;
                case ServerState.stopping:
                    await OnAfterStopping(ct);
                    await SetState(ServerState.stopped, ct);
                    break;
                case ServerState.restarting:
                    await SetState(ServerState.stopping, ct);
                    await SetState(ServerState.starting, ct);
                    break;
                case ServerState.stopped:
                    ServerStartTimestamp = null;
                    await OnAfterStopped(ct);
                    break;
                case ServerState.starting:
                    await OnAfterStarting(ct);
                    await SetState(ServerState.started, ct);
                    break;
            }
        }

        public abstract dynamic ValidateAndMapCfgToOptions(IServerCfg cfg);

        public void SetConfiguration(IServerCfg cfg)
        {
            ValidateAndMapCfgToOptions(cfg);

            _config = cfg;
        }

        protected abstract Task SyncServerState();

        protected abstract Task UnsafeStartAsync();

        protected abstract Task UnsafeStopAsync();

        protected abstract Task OnAfterRunning(CancellationToken ct);

        protected abstract Task OnAfterStarting(CancellationToken ct);

        protected abstract Task OnAfterStopped(CancellationToken ct);

        protected abstract Task OnAfterStopping(CancellationToken ct);

        protected abstract Task OnAfterUndefined(CancellationToken ct);

    }
}