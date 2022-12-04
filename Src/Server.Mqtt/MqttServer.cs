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

        public readonly ITopicStore Topics;

        public readonly IMessageStore Messages;

        public EdgeMqttServer(
            IServerCfg cfg,
            IServerEventPublisher? publisher = null
        ) : base(MONITOR_PERIOD, cfg, publisher)
        {
            Clients = InitClientStore();

            Topics = InitTopicStore();

            Messages = InitMessageStore();

            Meter = new EdgeMqttServerMeter(this);
        }

        private IMessageStore InitMessageStore()
        {
            var store = new InMemoryMessageStore(this);

            store.OnNewMessage += OnNewMessage;

            return store;
        }

        private ITopicStore InitTopicStore()
        {
            var store = new InMemoryTopicStore(this);

            store.OnNewTopic += OnNewTopic;
            store.OnTopicIncrement += OnTopicUpdate;
            store.OnClear += OnTopicsClear;

            return store;
        }

        private IClientStore InitClientStore()
        {
            var store = new InMemoryClientStore(this);

            store.OnClientUpdate += OnClientUpdated;
            store.OnNewClient += OnNewClient;

            return store;
        }

        public ICollection<string> GetPublishedTopics()
        {
            return Topics
            .GetTopics()
            .Select(e => e.Topic)
            .ToList();
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
            server.InterceptingPublishAsync += OnInterceptingPublishAsync_RecordTopic;
            server.InterceptingPublishAsync += OnInterceptingPublishAsync_RecordMessage;

            server.ClientSubscribedTopicAsync += OnClientSubscribedTopicAsync;

            server.ClientUnsubscribedTopicAsync += OnClientUnsubscribedTopicAsync;

            server.StartedAsync += OnStartedAsync_PublishDomainEvent;

            server.StoppedAsync += OnStoppedAsync_ResetStatistic;
            server.StoppedAsync += OnStoppedAsync_PublishDomainEvent;

            server.InterceptingInboundPacketAsync += OnInterceptingInboundPacketAsync_IncrementMetrics;
            server.InterceptingInboundPacketAsync += OnInterceptingInboundPacketAsync_CheckClientWithStore;

            server.InterceptingOutboundPacketAsync += OnInterceptingOutboundPacketAsync_IncrementMetrics;
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
                    Messages.Dispose();
                }
                catch { }
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
                    if (Server != null && Server.IsStarted)
                    {
                        try
                        {
                            await Server.StopAsync();
                        }
                        catch { }
                    }

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

        // -------------------------------------
        // ----------- Server events -----------
        // -------------------------------------

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

        Task OnInterceptingInboundPacketAsync_IncrementMetrics(InterceptingPacketEventArgs args)
        {
            ServerStats.IncrementRcvCount();
            return Task.CompletedTask;
        }

        Task OnInterceptingOutboundPacketAsync_IncrementMetrics(InterceptingPacketEventArgs args)
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

            Topics.AddTopic(args.TopicFilter.Topic);

            ServerStats.IncrementSubscriptionsCount();

            ServerStats.RecordTopicSubscribed(args.TopicFilter.Topic);

            return Task.CompletedTask;
        }

        Task OnInterceptingPublishAsync_RecordTopic(InterceptingPublishEventArgs args)
        {
            if (args is null || args.ApplicationMessage is null || args.ApplicationMessage.Topic is null)
            {
                return Task.CompletedTask;
            };

            var topic = args.ApplicationMessage.Topic;

            if (!Topics.ContainsTopic(topic))
            {
                try
                {
                    Topics.AddTopic(topic);
                }
                catch { }
            }

            Topics.IncrementTopicStatCount(topic);

            return Task.CompletedTask;
        }

        Task OnInterceptingPublishAsync_RecordMessage(InterceptingPublishEventArgs args)
        {
            if (args is null ||
                args.ApplicationMessage is null ||
                args.ApplicationMessage.Topic is null ||
                args.ClientId is null
            )
            {
                return Task.CompletedTask;
            };

            var m = args.ApplicationMessage;

            Messages.AddMessage(
                new MqttStoredMessage()
                {
                    ClientUid = DTO_StoredMqttClient.GetUid(this.UID, args.ClientId),
                    ServerUid = this.UID,
                    Payload = m.Payload,
                    ContentType = m.ContentType,
                    Topic = m.Topic,
                    TopicUid = MqttStoredTopic.GetUid(this.UID, m.Topic),
                    ResponseTopic = m.ResponseTopic,
                    Dup = m.Dup,
                    Retain = m.Retain,
                    Qos = (byte)m.QualityOfServiceLevel,
                    ExpireInterval = (int)m.MessageExpiryInterval,
                    TimeStamp = DateTime.Now,
                    ClientId = args.ClientId
                }
            );

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
                Clients.UpdateClientDisconnected(client.Uid, DateTime.Now);
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
                Clients.UpdateClient(uid, (DTO_MqttProtocol)args.ProtocolVersion, args.Endpoint);
            }
            else
            {
                client = Clients.AddClient(args.ClientId, (DTO_MqttProtocol)args.ProtocolVersion, args.Endpoint);

                if (client is not null)
                    Clients.UpdateClientConnected(client.Uid, DateTime.Now);
            }

            return Task.CompletedTask;
        }

        Task OnClientConnected_HandleMetrics(ClientConnectedEventArgs args)
        {
            ServerStats.IncrementConnectionsCount();

            return Task.CompletedTask;
        }

        // -------------------------------------
        // -------- Topic store events ---------
        // -------------------------------------

        void OnNewTopic(object? sender, TopicEventArgs args)
        {
            if (args is null)
            {
                return;
            }

            this._publisher.PublishEvent(
                new MqttServerNewInboundTopic()
                {
                    ServerUid = this.UID,
                    Topic = args.Topic
                }
            );
        }

        void OnTopicUpdate(object? sender, TopicEventArgs args)
        {

            if (args is null)
            {
                return;
            }

            this._publisher.PublishEvent(
                new MqttServerTopicUpdated()
                {
                    ServerUid = this.UID,
                    Topic = args.Topic
                }
            );
        }

        void OnTopicsClear(object? sender, TopicClearEventArgs args)
        {

        }

        // -------------------------------------
        // -------- Client store events --------
        // -------------------------------------

        void OnClientUpdated(object? sender, ClientEventArgs args)
        {
            if (args is null)
            {
                return;
            }

            this._publisher.PublishEvent(
                new MqttClientUpdated()
                {
                    Client = args.Client,
                    TimeStamp = DateTime.Now,
                    ServerUid = this.UID,
                }
            );
        }

        void OnNewClient(object? sender, ClientEventArgs args)
        {
            if (args is not null)
            {
                this._publisher.PublishEvent(
                    new MqttNewClient()
                    {
                        Client = args.Client,
                        TimeStamp = DateTime.Now,
                        ServerUid = this.UID,
                    }
                );

                this._publisher.PublishEvent(
                    new MqttServerClientConnected()
                    {
                        Client = args.Client,
                        ConnectedAt = DateTime.Now,
                        ServerUid = this.UID,
                    }
                );

            }
        }

        // -------------------------------------
        // -------- Message store events --------
        // -------------------------------------

        void OnNewMessage(object? sender, MessageEventArgs args)
        {
            if (args is not null)
            {
                this._publisher.PublishMessage(
                    new MqttNewMessage()
                    {
                        Message = args.Message,
                        TimeStamp = args.Message.TimeStamp,
                        ServerUid = this.UID,
                    }
                );
            }
        }
    }
}