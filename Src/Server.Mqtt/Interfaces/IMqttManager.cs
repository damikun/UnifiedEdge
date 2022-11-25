using Server.Mqtt.DTO;

namespace Server.Manager.Mqtt
{
    public interface IMqttServerManager : IServerManager
    {
        Task<IList<DTO_MqttClient>> GetClients(string server_uid);

        Task<bool?> GetClientState(
            string server_uid,
            string client_uid
        );

        Task<bool> ContainsClient(string server_uid, string client_uid);

        Task CleanOldMessages(string server_uid, CancellationToken ct = default);

        Task<Dictionary<string, bool>> GetClientsState(
            string server_uid,
            string[] clients_uids
        );

        Task<IList<DTO_MqttClientSession>> GetServerSessions(string server_uid);

        Task<DTO_MqttClient?> GetClient(
            string server_uid,
            string clinet_uid
        );

        public Task<DTO_MqttClientStatistics?> ResetMqttClientStats(
            string server_uid,
            string server_client_uid
        );

        Task<IList<DTO_MqttMessage>> GetRecentMessages(string server_uid);

        Task<IList<DTO_MqttMessage>> GetTopicRecentMessages(
            string server_uid,
            string topic_uid
        );

        Task<IList<DTO_MqttMessage>> GetRecentMessages(
            string server_uid,
            string? topic_uid = null,
            string? client_uid = null
        );

        Task<IList<DTO_MqttMessage>> GetClientRecentMessages(
            string server_uid,
            string client_uid
        );

        Task<DTO_MqttTopic?> GetTopicByUid(
            string server_uid,
            string topic_uid
        );

        Task<DTO_MqttMessage?> GetMessageByUid(
            string server_uid,
            string message_uid
        );

        string BuildClinetUid(
            string serverUid,
            string clinetId
        );

        Task<DTO_MqttClientStatistics?> GetClientStatistics(
           string server_uid,
           string server_client_uid
        );

        Task<List<DTO_MqttTopic>> GetPublishedTopics(string server_uid);

        Task<DTO_MqttServerStats?> GetServerStatistics(
            string server_uid
        );

        public Task<DTO_MqttClientSession?> GetClientSession(
            string server_uid,
            string server_client_uid
        );
    }
}