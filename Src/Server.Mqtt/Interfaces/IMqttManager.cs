using Server.Mqtt.DTO;

namespace Server.Manager.Mqtt
{
    public interface IMqttServerManager : IServerManager
    {
        Task<IList<DTO_MqttClient>> GetClients(string server_uid);

        Task<IList<DTO_MqttClientSession>> GetServerSessions(string server_uid);

        Task<DTO_MqttClient?> GetClient(string server_uid, string clinet_uid);

        string BuildClinetUid(string serverUid, string clinetId);

        Task<DTO_MqttClientStatistics?> GetClientStatistics(
           string server_uid,
           string server_client_uid
        );

        Task<List<string>> GetPublishedTopics(string server_uid);

        Task<DTO_MqttServerStats?> GetServerStatistics(
            string server_uid
        );

        Task<List<DTO_MqttServerTopicStat>> GetServerTopicStatistics(
            string server_uid
        );

        public Task<DTO_MqttClientSession?> GetClientSession(
            string server_uid,
            string server_client_uid
        );
    }
}