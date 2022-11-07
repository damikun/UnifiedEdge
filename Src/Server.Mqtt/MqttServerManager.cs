using Server.Mqtt;
using Server.Mqtt.DTO;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager
        : ServerManager<EdgeMqttServer>, IMqttServerManager
    {

        public readonly IServerEventPublisher _event_publisher;


        public MqttServerManager(
            IEndpointService endpoint,
            IServerEventPublisher event_publisher,
            IServerStore? store = null
        ) : base(endpoint, store!)
        {
            _event_publisher = event_publisher;
        }

        protected override EdgeMqttServer CreateServerInstance(IServerCfg cfg)
        {
            return new EdgeMqttServer(cfg, _event_publisher);
        }

        public async Task<IList<DTO_MqttClient>> GetClients(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return await mqtt_server.GetClients();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IList<DTO_MqttClientSession>> GetServerSessions(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return await mqtt_server.GetServerSessions();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<DTO_MqttClientStatistics?> GetClientStatistics(
            string server_uid,
            string server_client_uid
        )
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    if (string.IsNullOrWhiteSpace(server_client_uid))
                    {
                        return null;
                    }

                    return await mqtt_server.GetClientStatistics(server_client_uid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<DTO_MqttServerStats?> GetServerStatistics(string server_uid)
        {
            var server = await GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    var stats = mqtt_server.ServerStats;

                    return new DTO_MqttServerStats()
                    {
                        ServerUid = server_uid,
                        ConnectionsCount = stats.ConnectionsCount,
                        SubscriptionsCount = stats.SubscriptionsCount,
                        NotConsumedCount = stats.NotConsumedCount,
                        PacketSndCount = stats.PacketSndCount,
                        PacketRcvCount = stats.PacketRcvCount,
                        PublishedTopicCount = stats.PublishedTopicCount,
                        SubscribedTopicCount = stats.SubscribedTopicCount,
                    };
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                throw new Exception("Server not found");
            }

        }

        public async Task<DTO_MqttClientSession?> GetClientSession(
            string server_uid,
            string server_client_uid
        )
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    if (string.IsNullOrWhiteSpace(server_client_uid))
                    {
                        return null;
                    }

                    return await mqtt_server.GetClientSession(server_client_uid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<List<string>> GetPublishedTopics(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    var topics = mqtt_server.GetPublishedTopics().ToList();

                    if (topics == null)
                    {
                        return new List<string>();
                    }
                    else
                    {
                        return topics;
                    }

                }
                catch
                {
                    return new List<string>();
                }
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<List<DTO_MqttServerTopicStat>> GetServerTopicStatistics(string server_uid)
        {
            var server = await GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    var pulished_topics = mqtt_server.ServerStats.PublishedTopics;

                    return pulished_topics.Select(e => new DTO_MqttServerTopicStat()
                    {
                        ServerUid = server_uid,
                        Topic = e.Key,
                        Count = e.Value
                    })
                    .Distinct()
                    .ToList();
                }
                catch
                {
                    return new List<DTO_MqttServerTopicStat>();
                }
            }
            else
            {
                throw new Exception("Server not found");
            }
        }
    }
}