using MQTTnet;
using System.Net;
using MQTTnet.Server;
using Server.Mqtt.DTO;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServer
        : ServerBase<MqttServerCfg, MqttServerOptions>, IServer, IDisposable
    {
        internal volatile MQTTnet.Server.MqttServer? Server;

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

        public readonly MqttServerStats ServerStats = new MqttServerStats();

        public readonly IClientStore Clients;

        public EdgeMqttServer(
            IServerCfg cfg,
            IServerEventPublisher? publisher = null
        ) : base(MONITOR_PERIOD, cfg, publisher)
        {
            Clients = new ClientStore(this);

            Meter = new EdgeMqttServerMeter(this);
        }

        public ICollection<string> GetPublishedTopics()
        {
            return ServerStats.PublishedTopics.Select(e => e.Key).ToList();
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
            server.ClientConnectedAsync += OnClientConnected_HandleMetrics;
            server.ClientConnectedAsync += OnClientConnected_AddClientToStore;

            server.ClientDisconnectedAsync += OnClientDisconnected_HandleMetrics;
            server.ClientDisconnectedAsync += OnClientDisconnected_UpdateClientStore;

            server.ApplicationMessageNotConsumedAsync += OnApplicationMessageNotConsumedAsync_HandleMetrics;

            server.InterceptingPublishAsync += OnInterceptingPublishAsync;

            server.ClientSubscribedTopicAsync += OnClientSubscribedTopicAsync;

            server.ClientUnsubscribedTopicAsync += OnClientUnsubscribedTopicAsync;

            server.StartedAsync += OnStartedAsync_PublishDomainEvent;

            server.StoppedAsync += OnStoppedAsync_ResetStatistic;
            server.StoppedAsync += OnStoppedAsync_PublishDomainEvent;

            server.InterceptingInboundPacketAsync += OnInterceptingInboundPacketAsync;
            server.InterceptingInboundPacketAsync += OnInterceptingInboundPacketAsync_CheckClientWithStore;

            server.InterceptingOutboundPacketAsync += OnInterceptingOutboundPacketAsync;
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

            ServerStats.ResetStats();

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
            var options = MapConfiguration(Online_Config);

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
                    Meter.Dispose();
                }
                catch { }

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

        Task OnInterceptingInboundPacketAsync_CheckClientWithStore(InterceptingPacketEventArgs args)
        {
            if (args is null || args.ClientId is null)
            {
                return Task.CompletedTask;
            };

            var uid = Clients.GetClientUid(args.ClientId);

            if (!Clients.Contains(uid))
            {
                Clients.AddClient(args.ClientId, DTO_MqttProtocol.Unknown, args.Endpoint);
            }

            return Task.CompletedTask;
        }

        Task OnInterceptingInboundPacketAsync(InterceptingPacketEventArgs args)
        {
            ServerStats.IncrementRcvCount();
            return Task.CompletedTask;
        }
        Task OnInterceptingOutboundPacketAsync(InterceptingPacketEventArgs args)
        {
            ServerStats.IncrementSndCount();
            return Task.CompletedTask;
        }

        Task OnStoppedAsync_ResetStatistic(EventArgs args)
        {
            ServerStats.ResetStats();

            return Task.CompletedTask;
        }

        Task OnStoppedAsync_PublishDomainEvent(EventArgs args)
        {
            this._publisher.PublishEvent(
                new ServerStopped()
                {
                    ServerUid = this.UID
                }
            );

            return Task.CompletedTask;
        }

        Task OnStartedAsync_PublishDomainEvent(EventArgs args)
        {
            this._publisher.PublishEvent(
                new ServerStarted()
                {
                    ServerUid = this.UID
                }
            );

            return Task.CompletedTask;
        }

        Task OnClientUnsubscribedTopicAsync(ClientUnsubscribedTopicEventArgs args)
        {
            if (args is null)
            {
                return Task.CompletedTask;
            };

            ServerStats.DecremenSubscriptionsCount();

            ServerStats.RecordTopicUnsubscibed(args.TopicFilter);

            return Task.CompletedTask;
        }


        Task OnClientSubscribedTopicAsync(ClientSubscribedTopicEventArgs args)
        {
            if (args is null)
            {
                return Task.CompletedTask;
            };

            ServerStats.IncrementSubscriptionsCount();

            ServerStats.RecordTopicSubscribed(args.TopicFilter.Topic);

            return Task.CompletedTask;
        }

        Task OnInterceptingPublishAsync(InterceptingPublishEventArgs args)
        {
            if (args is null)
            {
                return Task.CompletedTask;
            };

            if (args.ApplicationMessage != null)
            {
                try
                {
                    if (!ServerStats.InbountTopicExist(args.ApplicationMessage.Topic))
                    {
                        this._publisher.PublishEvent(
                            new MqttServerNewInboundTopic()
                            {
                                ServerUid = this.UID,
                                Topic = args.ApplicationMessage.Topic
                            }
                        );
                    }
                }
                catch { }

                ServerStats.RecordInboundTopic(args.ApplicationMessage.Topic);
            }

            return Task.CompletedTask;
        }

        Task OnApplicationMessageNotConsumedAsync_HandleMetrics(ApplicationMessageNotConsumedEventArgs args)
        {
            ServerStats.IncrementNotConsumedCount();

            return Task.CompletedTask;
        }

        Task OnClientDisconnected_UpdateClientStore(ClientDisconnectedEventArgs args)
        {
            if (args is null || args.ClientId is null)
            {
                return Task.CompletedTask;
            };

            var uid = Clients.GetClientUid(args.ClientId);

            var client = Clients.GetClientByUid(uid);

            if (client is not null)
            {
                client.DisconnectedTimeStamp = DateTime.Now;
            }
            else
            {
                client = Clients.AddClient(args.ClientId, DTO_MqttProtocol.Unknown, args.Endpoint);

                if (client is not null)
                    Clients.UpdateClientDisconnected(client.Uid, DateTime.Now);
            }

            if (client is not null)
            {
                try
                {
                    this._publisher.PublishEvent(
                        new MqttServerClientDisconnected()
                        {
                            Client = client,
                            ServerUid = this.UID
                        }
                    );
                }
                catch
                {

                }
            }

            return Task.CompletedTask;
        }

        Task OnClientDisconnected_HandleMetrics(ClientDisconnectedEventArgs args)
        {
            ServerStats.DecrementConnectionsCount();

            return Task.CompletedTask;
        }

        Task OnClientConnected_AddClientToStore(ClientConnectedEventArgs args)
        {
            if (args == null || args.ClientId is null)
            {
                return Task.CompletedTask;
            };

            var uid = Clients.GetClientUid(args.ClientId);

            var client = Clients.GetClientByUid(uid);

            if (client is not null)
            {
                Clients.UpdateClientProtocol(uid, (DTO_MqttProtocol)args.ProtocolVersion);
            }
            else
            {
                client = Clients.AddClient(args.ClientId, (DTO_MqttProtocol)args.ProtocolVersion, args.Endpoint);

                if (client is not null)
                    Clients.UpdateClientConnected(client.Uid, DateTime.Now);
            }

            if (client is not null)
            {
                try
                {
                    this._publisher.PublishEvent(
                        new MqttServerClientConnected()
                        {
                            Client = client,
                            ConnectedAt = DateTime.Now,
                            ServerUid = this.UID,
                        }
                    );
                }
                catch
                {

                }
            }


            return Task.CompletedTask;
        }

        Task OnClientConnected_HandleMetrics(ClientConnectedEventArgs args)
        {
            ServerStats.IncrementConnectionsCount();

            return Task.CompletedTask;
        }

    }
}