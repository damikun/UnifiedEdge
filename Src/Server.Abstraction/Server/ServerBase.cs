using System.Text.Json;

namespace Server
{
    public abstract class ServerBase<U, T> : IServerBase, IDisposable
    {
        public string UID { get; private set; }

        private Type OptionsType { get; init; } = typeof(T);

        private bool isDisposing { get; set; }

        private IServerCfg Offline_Config { get; set; }

        protected IServerCfg Online_Config { get; private set; }

        protected internal readonly IServerEventPublisher _publisher;

        public abstract string MeterName { get; }

        public bool isConfigMatch
        {
            get
            {
                return Offline_Config?.TimeStamp == Online_Config?.TimeStamp;
            }
        }

        public ServerBase(
            int MONITOR_PERIOD,
            IServerCfg cfg,
            IServerEventPublisher? publisher = null
        )
        {
            _publisher = publisher ?? new ServerEventPublisher();

            this.UID = cfg.Server_UID;

            SetConfiguration(cfg);

            _monitor = new Timer(
                MonitorCallback!,
                this,
                MONITOR_PERIOD,
                MONITOR_PERIOD
            );

            _ = SyncServerState();
        }

        public bool isTransition()
        {
            var state = State;

            if (state == ServerState.starting ||
                state == ServerState.stopping ||
                state == ServerState.restarting
            )
            {
                return true;
            }
            return false;
        }


        private void ValidateUid(string uid)
        {
            if (string.IsNullOrWhiteSpace(uid))
            {
                throw new ArgumentNullException(nameof(uid));
            }

            if (uid.Contains("-") || uid.Contains("."))
            {
                throw new Exception("Invalid Server Uid format");
            }

            // Todo Add Regex uid format validation
        }

        private Task? _current;

        private volatile ServerState _state = ServerState.undefined;

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

        public ServerConfigState ConfigState()
        {
            return new ServerConfigState()
            {
                // ToDo This must be Read/write as sigle operation...
                ServerUid = this.UID,
                IsConfigMatch = this.isConfigMatch,
                OnlineConfig = SerializeConfig(this.Online_Config),
                OfflineConfig = SerializeConfig(this.Offline_Config),
                OfflineTimeStamp = this.Offline_Config?.TimeStamp ?? null,
                OnlineTimeStamp = this.Online_Config?.TimeStamp ?? null
            };
        }

        private string? SerializeConfig(IServerCfg cfg)
        {
            if (cfg == null)
            {
                return null;
            }

            return JsonSerializer.Serialize(
                cfg,
                cfg.GetType(),
                new JsonSerializerOptions() { WriteIndented = true }
            );
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
                    await ((ServerBase<U, T>)server).SyncServerState();
                }

            }
            catch { }
        }

        private async Task OnStateChangedInternal(ServerState before, ServerState after)
        {
            try
            {
                await StateChanged(before, after);

                _publisher.PublishEvent(new ServerStateChangedEvent()
                {
                    ServerUid = this.UID,
                    State = after
                });
            }
            catch { }

        }

        protected async Task<ServerState> SetState(
            ServerState state,
            CancellationToken ct = default,
            bool in_background = false
        )
        {
            if (isDisposing)
            {
                throw new Exception("Server termination is in progress");
            }

            // Set state enum
            State = state;

            try
            {
                if (_current != null)
                {
                    _current.Dispose();
                }
            }
            catch { }

            _current = null;

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

                _publisher.PublishError(this.UID, "State transition error");
            },
            TaskContinuationOptions.OnlyOnFaulted)
            .ContinueWith(t =>
            {
                // Finish
            },
            TaskContinuationOptions.NotOnFaulted);

            if (!in_background && _current != null)
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

                    return DateTime.Now.Subtract(ServerStartTimestamp.Value);
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
            if (isDisposing)
            {
                throw new Exception("Server termination is in progress");
            }

            await _semaphore.WaitAsync(ct);

            if (!this.Online_Config.IsEnabled)
            {
                throw new Exception("Server is disabled");
            }

            if (_current != null && !_current.IsCompleted)
            {
                // await _current;
                throw new Exception("Transition pending");
            }

            bool in_background = true;

            try
            {
                switch (cmd)
                {
                    case ServerCmd.start:
                        if (State == ServerState.stopped)
                        {
                            return await SetState(
                                ServerState.starting,
                                ct,
                                in_background
                            );
                        }
                        break;
                    case ServerCmd.stop:
                        if (State != ServerState.stopping)
                        {
                            return await SetState(
                                ServerState.stopping,
                                ct,
                                in_background
                            );
                        }
                        break;
                    case ServerCmd.restart:
                        if (State == ServerState.started && !isDisposing)
                        {
                            return await SetState(
                                ServerState.restarting,
                                ct,
                                in_background
                            );
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
                    await OnUndefined(ct);
                    await SetState(ServerState.stopped, ct);
                    break;
                case ServerState.started:
                    await OnRunning(ct);
                    break;
                case ServerState.stopping:
                    await OnStopping(ct);
                    await SetState(ServerState.stopped, ct);
                    break;
                case ServerState.restarting:
                    await SetState(ServerState.stopping, ct);
                    await SetState(ServerState.starting, ct);
                    break;
                case ServerState.stopped:
                    await OnStopped(ct);
                    break;
                case ServerState.starting:
                    await OnStarting(ct);
                    await SetState(ServerState.started, ct);
                    break;
                case ServerState.disabled:
                    await OnStopping(ct);
                    await SetState(ServerState.disabled, ct);
                    break;
            }
        }

        private void HandleMatchConfig()
        {
            if (Online_Config == Offline_Config)
            {
                return;
            };

            Online_Config = Offline_Config;

            try
            {
                _publisher.PublishEvent(new ServerConfigMatch()
                {
                    ServerUid = this.UID,
                    isMatch = true,
                    Offline_Config = Offline_Config,
                    Online_Config = Online_Config
                });
            }
            catch { }
        }

        private void HandleMissMatchConfig()
        {

            try
            {
                _publisher.PublishEvent(new ServerConfigMatch()
                {
                    ServerUid = this.UID,
                    isMatch = false,
                    Offline_Config = Offline_Config,
                    Online_Config = Online_Config
                });
            }
            catch { }

        }

        public void SetConfiguration(IServerCfg cfg)
        {
            if (cfg.Server_UID != this.UID)
            {
                throw new Exception(
                    "Invalid Offline_Config UID. Server.UID and Offline_Config.UID does not match."
                );
            }

            ValidateServerConfig(cfg);

            Offline_Config = cfg;

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

        private Task StopAsync()
        {
            return UnsafeStopAsync();
        }

        private Task StartAsync()
        {
            return UnsafeStartAsync();
        }

        // OnState

        private async Task OnRunning(CancellationToken ct)
        {
            await OnBeforeRunning(ct);
            await OnAfterRunning(ct);
        }

        private async Task OnStarting(CancellationToken ct)
        {
            await OnBeforeStarting(ct);

            await Task.Delay(1000);
            await this.StartAsync();

            await OnAfterStarting(ct);
        }

        private async Task OnStopping(CancellationToken ct)
        {
            await OnBeforeStopping(ct);

            await this.StopAsync();
            await Task.Delay(1000);

            await OnAfterStopping(ct);
        }

        private async Task Running(CancellationToken ct)
        {
            await OnBeforeRunning(ct);
            await OnAfterRunning(ct);
        }

        private async Task OnStopped(CancellationToken ct)
        {
            await OnBeforeStopped(ct);
            await OnAfterStopped(ct);
        }

        private async Task OnUndefined(CancellationToken ct)
        {
            await OnBeforeUndefined(ct);
            await OnAfterUndefined(ct);
        }

        // OnBefore

        protected virtual Task OnBeforeRunning(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnBeforeStarting(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnBeforeStopped(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnBeforeStopping(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnBeforeUndefined(CancellationToken ct) => Task.CompletedTask;


        // OnAfter 

        protected virtual Task OnAfterRunning(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnAfterStarting(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnAfterStopped(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnAfterStopping(CancellationToken ct) => Task.CompletedTask;

        protected virtual Task OnAfterUndefined(CancellationToken ct) => Task.CompletedTask;


        public virtual Task StateChanged(ServerState before, ServerState after) => Task.CompletedTask;


        // Abstract members

        protected abstract Task SyncServerState();

        protected abstract Task UnsafeStartAsync();

        protected abstract Task UnsafeStopAsync();

        protected abstract T MapConfiguration(IServerCfg cfg);


        public void Dispose()
        {
            if (!isDisposing)
            {
                try
                {
                    _monitor.Dispose();
                }
                catch { }

                try
                {
                    if (_current != null)
                    {
                        _current.Dispose();

                        _current = null;
                    }

                }
                catch { }
            }

        }

        public void ValidateServerConfig(IServerCfg cfg)
        {
            if (cfg == null)
            {
                throw new ArgumentNullException(nameof(cfg));
            }

            ValidateUid(cfg.Server_UID);

            if (cfg is not U)
            {
                throw new Exception(
                    string.Format(
                    "MapServerConfiguration -> Invalid Offline_Config object type. Type: {0} is required",
                    nameof(T)
                    )
                );
            }

            ValidateConfiguration(cfg);

            MapConfiguration(cfg);
        }

        protected abstract void ValidateConfiguration(IServerCfg cfg);

        public abstract Task EnableLogging(bool enable);
    }

}