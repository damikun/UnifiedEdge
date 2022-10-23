using Server.Mqtt;
using Server.Mqtt.DTO;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager : ServerManager<EdgeMqttServer>, IMqttServerManager
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
                    var stats = mqtt_server.Stats;

                    return new DTO_MqttServerStats()
                    {
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
    }
}