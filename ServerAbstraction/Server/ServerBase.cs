using Server.Event;

namespace Server
{
    public abstract class ServerBase : IServerBase
    {
        public string UID { get; init; }

        private IServerCfg Config { get; set; }

        protected IServerCfg Current_Config { get; private set; }

        public event EventHandler<ServerEventArgs> OnConfigMatch;

        public event EventHandler<ServerEventArgs> OnConfigMissMatch;

        public event EventHandler<ServerStateChangedEventArgs> OnStateChanged;

        public bool isConfigMatch
        {
            get
            {
                return Config.TimeStamp == Current_Config.TimeStamp;
            }
        }

        public ServerBase(int MONITOR_PERIOD, IServerCfg cfg)
        {
            SetConfiguration(cfg);

            UID = cfg.Server_UID ?? Guid.NewGuid().ToString();

            _monitor = new Timer(
                MonitorCallback!,
                this,
                MONITOR_PERIOD,
                MONITOR_PERIOD
            );
        }

        private Task? _current;

        private ServerState _state = ServerState.undefined;

        public ServerState State
        {

            get { return _state; }
            private set
            {
                ServerState _before = _state;

                _state = value;

                _ = OnStateChangedInternal(_before, value);
            }
        }


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

        private async Task OnStateChangedInternal(ServerState before, ServerState after)
        {
            try
            {
                await StateChanged(before, after);
            }
            catch { }

            try
            {
                EventHandler<ServerStateChangedEventArgs> handler = OnStateChanged;

                var event_args = new ServerStateChangedEventArgs()
                {
                    Before = before,
                    After = after
                };

                handler(this, event_args);
            }
            catch { }
        }

        // Callback
        public abstract Task StateChanged(ServerState before, ServerState after);

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

            if (!this.Current_Config.IsEnabled)
            {
                throw new Exception("Server is disabled");
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
                case ServerState.stopped:
                case ServerState.disabled:
                case ServerState.starting:
                    HandleMatchConfig();
                    break;
            }

            switch (State)
            {
                case ServerState.started:
                    ServerStartTimestamp = DateTime.Now;
                    break;
                case ServerState.undefined:
                case ServerState.stopped:
                case ServerState.disabled:
                    ServerStartTimestamp = null;
                    break;
            }

            switch (State)
            {
                case ServerState.undefined:
                    await OnAfterUndefined(ct);
                    await SetState(ServerState.stopped, ct);
                    break;
                case ServerState.started:
                    await OnAfterRunning(ct);
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
                    await OnAfterStopped(ct);
                    break;
                case ServerState.starting:
                    await OnAfterStarting(ct);
                    await SetState(ServerState.started, ct);
                    break;
                case ServerState.disabled:
                    await OnAfterStopping(ct);
                    await SetState(ServerState.disabled, ct);
                    break;
            }
        }

        private void HandleMatchConfig()
        {
            Current_Config = Config;

            var event_args = new ServerEventArgs()
            {
                Server_UID = this.UID,
                Config = this.Config
            };

            EventHandler<ServerEventArgs> handler = OnConfigMatch;

            handler(this, event_args);
        }

        private void HandleMissMatchConfig()
        {
            var event_args = new ServerEventArgs()
            {
                Server_UID = this.UID,
                Config = this.Config
            };

            EventHandler<ServerEventArgs> handler = OnConfigMissMatch;

            handler(this, event_args);
        }

        public void SetConfiguration(IServerCfg cfg)
        {
            if (cfg == null)
            {
                throw new ArgumentNullException(nameof(cfg));
            }

            if (cfg.Server_UID != this.UID)
            {
                throw new Exception(
                    "Invalid Config UID. Server.UID and Config.UID does not match."
                );
            }

            MapCfgToOptions(cfg);

            Config = cfg;

            if (State == ServerState.disabled ||
            State == ServerState.stopped ||
            State == ServerState.undefined)
            {
                HandleMatchConfig();
            }
            else
            {
                HandleMissMatchConfig();
            }

        }

        protected abstract Task SyncServerState();

        protected abstract Task UnsafeStartAsync();

        protected abstract Task UnsafeStopAsync();

        public abstract dynamic MapCfgToOptions(IServerCfg cfg);

        protected abstract Task OnAfterRunning(CancellationToken ct);

        protected abstract Task OnAfterStarting(CancellationToken ct);

        protected abstract Task OnAfterStopped(CancellationToken ct);

        protected abstract Task OnAfterStopping(CancellationToken ct);

        protected abstract Task OnAfterUndefined(CancellationToken ct);

    }

}