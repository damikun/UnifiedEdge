using MQTTnet;
using MQTTnet.Server;

namespace Server
{

    [Serializable]
    internal sealed class MQTTService : StateMachineBase<IServiceState>, IMQTTService, IDisposable
    {
        public string ID { get; init; }

        private MqttServer? Server;

        private bool isDisposing { get; set; }

        private readonly SemaphoreSlim Semaphore = new SemaphoreSlim(1);

        private CancellationTokenSource Cts { get; set; } = new CancellationTokenSource();

        internal CancellationToken Ct { get { return Cts.Token; } }

        public MQTTService(MqttServerOptions? options = null)
        {
            ID = ID ?? Guid.NewGuid().ToString();

            Server = CreateServer(options);
        }

        public MQTTService(string id, MqttServerOptions? options = null)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new Exception("Invalid server ID value or format");
            }

            ID = id;

            Server = CreateServer(options);
        }

        private DateTime? ServerStartTimestamp;

        private TimeSpan? ServerUptime
        {
            get
            {
                if (ServerStartTimestamp != null)
                {
                    return DateTime.Now.Subtract(((DateTime)ServerStartTimestamp));
                }
                else
                {
                    return null;
                }
            }
        }

        public Task Handle(MqttCommand command)
        {
            Ct.ThrowIfCancellationRequested();

            switch (command)
            {
                case MqttCommand.stop: return StopAsync();
                case MqttCommand.restart: return RestartAsync();
                case MqttCommand.start: return StartAsync();

                default:
                    throw new Exception("Unhalted command passed as argument");
            }
        }
        public MqttState StateEnum
        {
            get
            {
                switch (State)
                {
                    case MQTTRunning: return MqttState.running;
                    case MQTTRestarting: return MqttState.restarting;
                    case MQTTStarting: return MqttState.starting;
                    case MQTTStopping: return MqttState.stopping;
                    case MQTTStopped: return MqttState.stopped;

                    default: return MqttState.unknown;
                }
            }
        }

        public Task StartAsync() => State.StartAsync();

        public Task StopAsync() => State.StopAsync();

        public Task RestartAsync() => State.Restart();

        private Task CheckServerState()
        {
            Ct.ThrowIfCancellationRequested();

            if (this.State.GetType() == typeof(MQTTRunning))
            {
                if (this.Server == null || !this.Server.IsStarted)
                {
                    return UnsafeStopAsync();
                }
            }
            else
            {
                if (this.Server != null && this.Server.IsStarted && this.State.GetType() != typeof(MQTTStarting))
                {
                    return UnsafeStopAsync();
                }
            }

            return Task.CompletedTask;
        }

        public async Task<bool> IsRunning()
        {
            await CheckServerState();

            if (this.State.GetType() == typeof(MQTTRunning))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        internal async Task UnsafeStartAsync()
        {

            if (isDisposing)
            {
                throw new Exception("Unable to start, server is terminated");
            }

            Ct.ThrowIfCancellationRequested();

            await Semaphore.WaitAsync();

            Ct.ThrowIfCancellationRequested();

            try
            {
                if (Server == null)
                {
                    Server = CreateServer();

                    Cts = new CancellationTokenSource();
                }

                await Server.StartAsync();

                ServerStartTimestamp = DateTime.Now;

                await SetState(new MQTTRunning(this));
            }
            finally
            {
                Semaphore.Release();
            }
        }

        internal async Task UnsafeStopAsync()
        {
            Ct.ThrowIfCancellationRequested();

            await Semaphore.WaitAsync();

            Ct.ThrowIfCancellationRequested();

            try
            {
                if (Server != null)
                {
                    if (!Cts.IsCancellationRequested)
                    {
                        Cts.Cancel();
                    }

                    await Task.WhenAll(Task.Delay(100), Server.StopAsync());

                    ServerStartTimestamp = null;

                    await SetState(new MQTTStopped(this));

                    Server.Dispose();
                }
            }
            catch
            {
                // Maybe log restart fails...
            }
            finally
            {
                Server = null;

                Semaphore.Release();
            }

            GC.Collect();

            GC.WaitForPendingFinalizers();
        }

        public async Task<IList<MqttClientStatus>> GetClientsAsync()
        {
            Ct.ThrowIfCancellationRequested();

            await CheckServerRunning();

            return await Server?.GetClientsAsync()!;
        }

        private MQTTnet.Server.MqttServer CreateServer(MqttServerOptions? options = null)
        {
            var mqttFactory = new MqttFactory();

            if (options == null)
            {
                options = GetDefaultOptions();
            }

            return mqttFactory.CreateMqttServer(options);
        }

        protected override IServiceState DefaultState() => new MQTTStopped(this);

        private static MqttServerOptions GetDefaultOptions(int? port = null)
        {
            var mqttServerOptions = new MqttServerOptionsBuilder()
            .WithDefaultEndpoint();

            if (port.HasValue && port >= 1)
                mqttServerOptions.WithDefaultEndpointPort(port.Value);

            return mqttServerOptions.Build();
        }

        private async Task CheckServerRunning()
        {
            if (!await this.IsRunning() || Server == null)
            {
                throw new ServerNotRunningException();
            }
        }

        public void Dispose()
        {
            if (!isDisposing)
            {
                isDisposing = true;

                try
                {
                    Cts?.Cancel();

                    Cts?.Dispose();
                }
                catch
                {

                }
                finally
                {
                    Server?.Dispose();

                    Server = null;

                    GC.SuppressFinalize(this);
                }
            }
        }
    }
}