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

        public readonly MqttServerStats ServerStats = new MqttServerStats();

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
                    .Select(e => MapStatusToStatusDto(e))
                    .ToList();

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
                    .Select(e => MapStatusToStatusDto(e))
                    .FirstOrDefault();

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

        public ICollection<string> GetPublishedTopics()
        {
            return ServerStats.PublishedTopics.Select(e => e.Key).ToList();
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
                ServerStats.IncrementConnectionsCount();

                this._publisher.PublishEvent(
                    new MqttServerClientConnected()
                    {
                        ClientId = d.ClientId,
                        ConnectedAt = DateTime.Now,
                        Protocol = d.ProtocolVersion,
                        UID = this.UID,
                    }
                );

                return Task.CompletedTask;
            };

            server.ClientDisconnectedAsync += (d) =>
            {
                ServerStats.DecrementConnectionsCount();

                this._publisher.PublishEvent(
                    new MqttServerClientDisconnected()
                    {
                        ClientId = d.ClientId,
                        UID = this.UID
                    }
                );

                return Task.CompletedTask;
            };


            server.ApplicationMessageNotConsumedAsync += (d) =>
            {
                ServerStats.IncrementNotConsumedCount();
                return Task.CompletedTask;
            };

            server.InterceptingPublishAsync += (d) =>
            {
                if (d.ApplicationMessage != null)
                {
                    try
                    {
                        if (!ServerStats.InbountTopicExist(d.ApplicationMessage.Topic))
                        {
                            this._publisher.PublishEvent(
                                new MqttServerNewInboundTopic()
                                {
                                    UID = this.UID,
                                    Topic = d.ApplicationMessage.Topic
                                }
                            );
                        }
                    }
                    catch { }

                    ServerStats.RecordInboundTopic(d.ApplicationMessage.Topic);
                }


                return Task.CompletedTask;
            };

            server.ClientSubscribedTopicAsync += (d) =>
            {
                ServerStats.IncrementSubscriptionsCount();

                ServerStats.RecordTopicSubscribed(d.TopicFilter.Topic);

                return Task.CompletedTask;
            };

            server.ClientUnsubscribedTopicAsync += (d) =>
            {
                ServerStats.DecremenSubscriptionsCount();

                ServerStats.RecordTopicUnsubscibed(d.TopicFilter);

                return Task.CompletedTask;
            };

            server.StartedAsync += (d) =>
            {
                this._publisher.PublishEvent(
                    new ServerStarted()
                    {
                        UID = this.UID
                    }
                );

                return Task.CompletedTask;
            };

            server.StoppedAsync += (d) =>
            {
                ServerStats.ResetStats();

                this._publisher.PublishEvent(
                    new ServerStopped()
                    {
                        UID = this.UID
                    }
                );

                return Task.CompletedTask;
            };

            server.InterceptingInboundPacketAsync += (d) =>
            {
                ServerStats.IncrementRcvCount();
                return Task.CompletedTask;
            };

            server.InterceptingOutboundPacketAsync += (d) =>
            {
                ServerStats.IncrementSndCount();
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

        private DTO_MqttClientStatistics MapStatusToStatusDto(MqttClientStatus e)
        {
            return new DTO_MqttClientStatistics()
            {
                ClientUid = e.Id,
                ServerUid = this.UID,
                BytesSent = e.BytesSent,
                BytesReceived = e.BytesReceived,
                SentPacketsCount = e.SentPacketsCount,
                ConnectedTimestamp = e.ConnectedTimestamp,
                ReceivedPacketsCount = e.ReceivedPacketsCount,
                LastPacketSentTimestamp = e.LastPacketSentTimestamp,
                LastPacketReceivedTimestamp = e.LastPacketReceivedTimestamp,
                SentApplicationMessagesCount = e.SentApplicationMessagesCount,
                ReceivedApplicationMessagesCount = e.ReceivedApplicationMessagesCount,
                LastNonKeepAlivePacketReceivedTimestamp = e.LastNonKeepAlivePacketReceivedTimestamp,
            };
        }

    }
}