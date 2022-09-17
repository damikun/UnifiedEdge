using MQTTnet;
using MQTTnet.Server;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServer : ServerBase, IServer, IDisposable
    {
        private MQTTnet.Server.MqttServer? Server;

        const int MONITOR_PERIOD = 30000;

        private bool isDisposing { get; set; }

        private SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        public EdgeMqttServer(
            IServerCfg cfg
        ) : base(MONITOR_PERIOD, cfg)
        {

        }

        public override dynamic MapCfgToOptions(IServerCfg cfg)
        {
            var builder = new MqttServerOptionsBuilder();

            if (cfg is MqttServerCfg mqtt_cfg)
            {
                builder.WithDefaultEndpoint();

                if (mqtt_cfg.port.HasValue)
                {
                    builder.WithDefaultEndpointPort(mqtt_cfg.port.Value);
                };

            }
            else
            {
                throw new Exception(
                    string.Format(
                        "Invalid config object type. Type: {0} is required",
                        nameof(MqttServerCfg)
                    )
                );
            }

            return builder.Build();
        }

        protected override Task SyncServerState()
        {

            if (this.State == ServerState.started)
            {
                if (this.Server == null || !this.Server.IsStarted)
                {
                    return UnsafeStopAsync();
                }
            }
            else
            {
                if (
                    this.Server != null &&
                    this.Server.IsStarted &&
                   (this.State != ServerState.starting ||
                    this.State != ServerState.stopping ||
                    this.State != ServerState.restarting))
                {
                    return UnsafeStopAsync();
                }
            }

            return Task.CompletedTask;
        }

        protected override async Task UnsafeStartAsync()
        {
            if (isDisposing)
            {
                throw new Exception("Unable to start, server is terminated");
            }

            if (Server != null)
            {
                await UnsafeStopAsync();
            }

            await _semaphore.WaitAsync();

            try
            {
                Server = CreateMqttServer(
                    MapCfgToOptions(Config)
                );

                await Server.StartAsync();
            }
            finally
            {
                _semaphore.Release();
            }
        }

        protected override async Task UnsafeStopAsync()
        {


            await _semaphore.WaitAsync();

            try
            {
                if (isDisposing)
                {
                    throw new Exception("Unable to start, server is terminated");
                }

                if (Server != null)
                {
                    await Task.WhenAll(Task.Delay(100), Server.StopAsync());

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

                _semaphore.Release();
            }

            GC.Collect();

            GC.WaitForPendingFinalizers();
        }

        private MQTTnet.Server.MqttServer CreateMqttServer(MqttServerOptions? options = null)
        {
            var mqttFactory = new MqttFactory();

            if (options == null)
            {
                options = GetDefaultOptions();
            }

            return mqttFactory.CreateMqttServer(options);
        }

        private static MqttServerOptions GetDefaultOptions(int? port = null)
        {
            var mqttServerOptions = new MqttServerOptionsBuilder()
            .WithDefaultEndpoint();

            if (port.HasValue && port >= 1)
                mqttServerOptions.WithDefaultEndpointPort(port.Value);

            return mqttServerOptions.Build();
        }

        public void Dispose()
        {
            if (!isDisposing)
            {
                isDisposing = true;

                try
                {
                    Server?.Dispose();

                }
                catch { }
                finally
                {
                    Server = null;

                    GC.SuppressFinalize(this);
                }
            }
        }

        public override Task OnStateChanged(ServerState before, ServerState after)
        {
            throw new NotImplementedException();
        }

        protected override Task OnAfterRunning(CancellationToken ct)
        {
            return Task.CompletedTask;
        }

        protected async override Task OnAfterStarting(CancellationToken ct)
        {
            await Task.Delay(1000);

            await this.UnsafeStartAsync();
        }

        protected override Task OnAfterStopped(CancellationToken ct)
        {
            return Task.CompletedTask;
        }

        protected async override Task OnAfterStopping(CancellationToken ct)
        {
            await this.UnsafeStopAsync();

            await Task.Delay(1000);
        }

        protected override Task OnAfterUndefined(CancellationToken ct)
        {
            return Task.CompletedTask;
        }

        public Task<IServer> CreateServerInstance(IServerCfg cfg)
        {
            return Task.FromResult(
                new EdgeMqttServer(cfg) as IServer
            );
        }

        public Task<IServer> CreateDefaultServer()
        {
            throw new NotImplementedException();
        }
    }
}