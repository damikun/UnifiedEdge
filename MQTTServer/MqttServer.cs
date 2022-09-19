using MQTTnet;
using MQTTnet.Server;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServer : ServerBase<MqttServerOptions>, IServer, IDisposable
    {
        private MQTTnet.Server.MqttServer? Server;

        const int MONITOR_PERIOD = 30000;

        private bool isDisposing { get; set; }

        public static ServerInfo Info = new ServerInfo()
        {
            DisplayName = "MQTT",
            ServerType = typeof(EdgeMqttServer)
        };

        private SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        public EdgeMqttServer(
            IServerCfg cfg
        ) : base(MONITOR_PERIOD, cfg)
        {

        }

        public override MqttServerOptions MapCfgToOptions(IServerCfg cfg)
        {
            var builder = new MqttServerOptionsBuilder();

            if (cfg is MqttServerCfg mqtt_cfg)
            {
                builder.WithDefaultEndpoint();

                if (mqtt_cfg.Port.HasValue)
                {
                    builder.WithDefaultEndpointPort(mqtt_cfg.Port.Value);
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
                Server = CreateMqttServer();

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

        private MQTTnet.Server.MqttServer CreateMqttServer()
        {
            var options = MapCfgToOptions(Current_Config);

            var mqttFactory = new MqttFactory();

            return mqttFactory.CreateMqttServer(options);
        }

        public async new void Dispose()
        {
            if (!isDisposing)
            {
                isDisposing = true;

                try
                {
                    base.Dispose();
                }
                catch { }

                try
                {
                    try
                    {
                        if (Server != null && Server.IsStarted)
                        {
                            await Server.StopAsync();
                        }
                    }
                    catch { }

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

    }
}