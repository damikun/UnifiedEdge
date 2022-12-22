using Server.Mqtt;
using MQTTnet.Server;
using Server.Mqtt.DTO;
using Server.Mqtt.Subscriptions;

namespace Server.Manager.Mqtt
{
    public class MqttServerManager
        : ServerManager<EdgeMqttServer>, IMqttServerManager
    {

        public readonly IServerEventPublisher _event_publisher;

        public readonly IMqttAuthHandler? _auth_handler;


        public MqttServerManager(
            IEndpointService endpoint,
            IServerEventPublisher event_publisher,
            IServerStore? store = null,
            IMqttAuthHandler? auth_handler = null
        ) : base(endpoint, EdgeMqttServer.Info, store!)
        {
            _event_publisher = event_publisher;
            _auth_handler = auth_handler;
        }

        protected override EdgeMqttServer CreateServerInstance(IServerCfg cfg)
        {
            return new EdgeMqttServer(cfg, _event_publisher, _auth_handler);
        }

        public async Task<MqttTopicSubscription> Subscribe(string server_uid, string topic)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                return await mqtt_server.Subscriptions.CreateSubscription(topic);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task Unsubscribe(string server_uid, string subscription_id)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                await mqtt_server.Subscriptions.Unsubscribe(subscription_id);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task UnsubscribeAll(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                await mqtt_server.Subscriptions.UnsubscribeAll();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task UnsubscribeAll()
        {
            var servers = await this.GetAllServers();

            foreach (var server in servers)
            {
                try
                {
                    if (server is not null && server is EdgeMqttServer mqtt_server)
                    {

                        await mqtt_server.Subscriptions.UnsubscribeAll();
                    }
                }
                catch { }
            }
        }

        public async Task<HashSet<string>> CheckSubscriptions(string server_uid, string topic)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                return mqtt_server.Subscriptions.CheckSubscriptions(topic);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }
        public async Task<bool?> GetClientState(string server_uid, string client_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                if (string.IsNullOrWhiteSpace(client_uid))
                {
                    return null;
                }

                return await mqtt_server.Clients
                    .IsConnected(client_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IEnumerable<MqttServerLog>> GetServerLogs(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Logger.GetLogs();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<MqttServerLog?> GetServerLog(string server_uid, string log_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Logger
                .GetLogs()
                .Where(e => e.Uid == log_uid)
                .FirstOrDefault();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<Dictionary<string, bool>> GetClientsState(string server_uid, string[] clients_uids)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                if (clients_uids is null || clients_uids.Length == 0)
                {
                    return new Dictionary<string, bool>();
                }

                return await mqtt_server.Clients
                    .IsConnected(clients_uids);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task CleanOldMessages(string server_uid, CancellationToken ct = default)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                await mqtt_server.Messages.CleanOldMessages(ct);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<DTO_MqttClientStatistics?> ResetMqttClientStats(
            string server_uid,
            string server_client_uid
        )
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                if (string.IsNullOrWhiteSpace(server_client_uid))
                {
                    return null;
                }

                return await mqtt_server.Clients.ResetClientStatistics(server_client_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }


        public async Task Publish(string server_uid, InjectedMqttApplicationMessage message, CancellationToken ct = default)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                await mqtt_server.Publish(message, ct);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<DTO_MqttClient?> GetClient(string server_uid, string clinet_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                if (string.IsNullOrWhiteSpace(clinet_uid))
                {
                    return null;
                }

                return mqtt_server.Clients
                    .GetClientByUid(clinet_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public string BuildClinetUid(string serverUid, string clinetId) => DTO_MqttClient.BuildClientUid(serverUid, clinetId);

        public async Task<IList<DTO_MqttClient>> GetClients(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Clients
                    .GetClients();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IList<DTO_MqttMessage>> GetRecentMessages(
            string server_uid,
            string? topic_uid = null,
            string? client_uid = null
        )
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Messages
                    .GetRecentMessages(client_uid, topic_uid)
                    .ToList();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<bool> ContainsClient(string server_uid, string client_uid)
        {
            var server = await this.GetServer(server_uid);

            if (string.IsNullOrWhiteSpace(client_uid))
            {
                return false;
            }

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Clients.Contains(client_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<bool> ContainsTopic(string server_uid, string topic_uid)
        {
            var server = await this.GetServer(server_uid);

            if (string.IsNullOrWhiteSpace(topic_uid))
            {
                return false;
            }

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Topics.Contains(topic_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IList<DTO_MqttMessage>> GetRecentMessages(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                return mqtt_server.Messages
                    .GetRecentMessages()
                    .ToList();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IList<DTO_MqttMessage>> GetTopicRecentMessages(string server_uid, string topic_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                if (string.IsNullOrWhiteSpace(topic_uid))
                {
                    return new List<DTO_MqttMessage>();
                }

                return mqtt_server.Messages
                    .GetTopicRecentMessages(topic_uid)
                    .ToList();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task EnableLogging(string server_uid, bool enable)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                mqtt_server.Logger.EnableLogger(enable);

                return;
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<IList<DTO_MqttMessage>> GetClientRecentMessages(string server_uid, string client_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                if (string.IsNullOrWhiteSpace(client_uid))
                {
                    return new List<DTO_MqttMessage>();
                }

                return mqtt_server.Messages
                    .GetTopicRecentMessages(client_uid)
                    .ToList();
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

        public async Task<DTO_MqttMessage?> GetMessageByUid(string server_uid, string message_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                if (string.IsNullOrWhiteSpace(message_uid))
                {
                    return null;
                }

                return mqtt_server.Messages
                    .GetMessageByUid(message_uid);
            }
            else
            {
                throw new Exception("Server not found");
            }
        }
        public async Task<DTO_MqttTopic?> GetTopicByUid(string server_uid, string topic_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {

                if (string.IsNullOrWhiteSpace(topic_uid))
                {
                    return null;
                }

                return mqtt_server.Topics
                    .GetTopicByUid(topic_uid);
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
                return await mqtt_server.Clients
                    .GetSessions();
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

                    return await mqtt_server.Clients
                        .GetClientStatistics(server_client_uid);
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

                    return await mqtt_server.Clients.GetClientSession(server_client_uid);
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

        public async Task<List<DTO_MqttTopic>> GetPublishedTopics(string server_uid)
        {
            var server = await this.GetServer(server_uid);

            if (server is not null && server is EdgeMqttServer mqtt_server)
            {
                try
                {
                    return mqtt_server.Topics.GetTopics();
                }
                catch
                {
                    return new List<DTO_MqttTopic>();
                }
            }
            else
            {
                throw new Exception("Server not found");
            }
        }

    }
}