using MQTTnet;
using System.Net;
using MQTTnet.Server;
using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServer
        : ServerBase<MqttServerCfg, MqttServerOptions>, IServer, IDisposable
    {
        private MQTTnet.Server.MqttServer? Server;

        const int MONITOR_PERIOD = 30000;

        private bool isDisposing { get; set; }

        public static ServerInfo Info => new ServerInfo()
        {
            DisplayName = "MQTT",
            ServerType = typeof(EdgeMqttServer)
        };

        private EdgeMqttServerMeter Meter { get; set; }

        private SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        public override string MeterName => Meter.MeterName;

        public EdgeMqttServer(
            IServerCfg cfg,
            IServerEventPublisher? publisher = null
        ) : base(MONITOR_PERIOD, cfg, publisher)
        {
            Meter = new EdgeMqttServerMeter(this);
        }

        private bool isTransition()
        {
            if (State == ServerState.starting ||
                State == ServerState.stopping ||
                State == ServerState.restarting
            )
            {
                return true;
            }
            return false;
        }

        public async Task<int> GetClientsCount()
        {
            try
            {
                return (await this.GetClients()).Count;
            }
            catch
            {
                return 0;
            }
        }

        public async Task<List<DTO_MqttClientStatistics>> GetClientsStatistics()
        {
            if (!isTransition() && Server != null)
            {
                try
                {
                    var client_list = await Server.GetClientsAsync();

                    return client_list
                    .Where(e => e != null && e.Session != null)
                    .Select(e => new DTO_MqttClientStatistics()
                    {
                        ClientUid = e.Id,
                        ServerUid = this.UID,
                        SentPacketsCount = e.SentPacketsCount,
                        ReceivedPacketsCount = e.ReceivedPacketsCount,
                        SentApplicationMessagesCount = e.SentApplicationMessagesCount,
                        ReceivedApplicationMessagesCount = e.ReceivedApplicationMessagesCount,
                        BytesSent = e.BytesSent,
                        BytesReceived = e.BytesReceived,
                        LastNonKeepAlivePacketReceivedTimestamp = e.LastNonKeepAlivePacketReceivedTimestamp,
                        ConnectedTimestamp = e.ConnectedTimestamp,
                        LastPacketSentTimestamp = e.LastPacketSentTimestamp,
                        LastPacketReceivedTimestamp = e.LastPacketReceivedTimestamp,
                    }).ToList();

                }
                catch { }
            }

            return new List<DTO_MqttClientStatistics>();
        }

        public async Task<DTO_MqttClientStatistics?> GetClientStatistics(string client_uid)
        {
            if (!isTransition() && Server != null)
            {
                try
                {
                    var client_list = await Server.GetClientsAsync();

                    return client_list
                    .Where(e => e != null && e.Session != null && e.Id == client_uid)
                    .Select(e => new DTO_MqttClientStatistics()
                    {
                        ClientUid = e.Id,
                        ServerUid = this.UID,
                        SentPacketsCount = e.SentPacketsCount,
                        ReceivedPacketsCount = e.ReceivedPacketsCount,
                        SentApplicationMessagesCount = e.SentApplicationMessagesCount,
                        ReceivedApplicationMessagesCount = e.ReceivedApplicationMessagesCount,
                        BytesSent = e.BytesSent,
                        BytesReceived = e.BytesReceived,
                        LastNonKeepAlivePacketReceivedTimestamp = e.LastNonKeepAlivePacketReceivedTimestamp,
                        ConnectedTimestamp = e.ConnectedTimestamp,
                        LastPacketSentTimestamp = e.LastPacketSentTimestamp,
                        LastPacketReceivedTimestamp = e.LastPacketReceivedTimestamp,
                    }).FirstOrDefault();

                }
                catch { }
            }
            return null;
        }

        public async Task<DTO_MqttClientSession?> GetClientSession(string client_uid)
        {
            if (!isTransition() && Server != null)
            {
                try
                {
                    var client_list = await Server.GetClientsAsync();

                    return client_list
                    .Where(e => e != null && e.Session != null && e.Id == client_uid)
                    .Select(e => new DTO_MqttClientSession()
                    {
                        ClientUid = e.Id,
                        Uid = e.Session.Id,
                        Created = e.Session?.CreatedTimestamp,
                        PendingMessages = e.Session?.PendingApplicationMessagesCount ?? 0
                    }).FirstOrDefault();

                }
                catch { }
            }
            return null;
        }

        public async Task<IList<DTO_MqttClientSession>> GetServerSessions()
        {

            if (!isTransition() && Server != null)
            {
                try
                {
                    var client_list = await Server.GetClientsAsync();

                    return client_list
                    .Where(e => e != null && e.Session != null)
                    .Select(e => new DTO_MqttClientSession()
                    {
                        ClientUid = e.Id,
                        Uid = e.Session.Id,
                        Created = e.Session?.CreatedTimestamp,
                        PendingMessages = e.Session?.PendingApplicationMessagesCount ?? 0
                    }).ToList();
                }
                catch { }

            }

            return new List<DTO_MqttClientSession>() as IList<DTO_MqttClientSession>;
        }

        public async Task<IList<DTO_MqttClient>> GetClients()
        {
            if (!isTransition() && Server != null)
            {
                try
                {
                    var client_list = await Server.GetClientsAsync();

                    return client_list
                    .Where(e => e != null)
                    .Select(e => new DTO_MqttClient()
                    {
                        Uid = e.Id,
                        ServerUid = this.UID,
                        Protocol = (DTO_MqttProtocol)e.ProtocolVersion,
                        ConnectedAt = e.ConnectedTimestamp
                    })
                    .ToList();
                }
                catch { }

            }

            return new List<DTO_MqttClient>() as IList<DTO_MqttClient>;
        }

        protected override MqttServerOptions MapConfiguration(IServerCfg cfg)
        {
            var builder = new MqttServerOptionsBuilder();

            var mqtt_cfg = (MqttServerCfg)cfg as MqttServerCfg;

            IPAddress ip = IPAddress.Parse(mqtt_cfg.IpAddress!);

            builder.WithDefaultEndpointBoundIPAddress(ip);

            builder.WithMaxPendingMessagesPerClient(mqtt_cfg.MaxPendingMessagesPerClient);

            builder.WithPersistentSessions(mqtt_cfg.PresistentSession);

            builder.WithDefaultCommunicationTimeout(mqtt_cfg.CommunicationTimeout);

            builder.WithDefaultEndpointPort(mqtt_cfg.Port);

            return builder.Build();
        }

        protected override void ValidateConfiguration(IServerCfg cfg)
        {

        }

        protected async override Task SyncServerState()
        {
            if (this.State == ServerState.started)
            {
                if (this.Server == null || !this.Server.IsStarted)
                {
                    await this.SetState(ServerState.stopping);
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
                    await UnsafeStopAsync();

                    await this.SetState(ServerState.stopping);
                }
            }

            if (this.State == ServerState.undefined)
            {
                await this.SetState(ServerState.stopped, default);
            }

        }

        private void RegisterServerEvents(MqttServer server)
        {
            server.ClientConnectedAsync += (d) =>
            {
                Meter.ConnectedClientsCounter.Add(1);
                return Task.CompletedTask;
            };

            server.ClientDisconnectedAsync += (d) =>
            {
                Meter.ConnectedClientsCounter.Add(-1);
                return Task.CompletedTask;
            };

            server.StartedAsync += (d) =>
            {
                return Task.CompletedTask;
            };

            server.StoppedAsync += (d) =>
            {
                return Task.CompletedTask;
            };

            server.InterceptingInboundPacketAsync += (d) =>
            {
                Meter.InboundPacketCounter.Add(1);
                return Task.CompletedTask;
            };

            server.InterceptingOutboundPacketAsync += (d) =>
            {
                Meter.OutboundPacketCounter.Add(1);
                return Task.CompletedTask;
            };

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
                var server = CreateMqttServer();

                RegisterServerEvents(server);

                Server = server;

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
            var options = MapConfiguration(Current_Config);

            var mqttFactory = new MqttFactory();
            options.DefaultEndpointOptions.IsEnabled = true;
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