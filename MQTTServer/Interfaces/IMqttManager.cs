using Server.Mqtt.DTO;

namespace Server.Manager.Mqtt
{
    public interface IMqttServerManager : IServerManager
    {
        Task<IList<DTO_MqttClient>> GetClients(string server_uid);

        Task<IList<DTO_MqttClientSession>> GetServerSessions(string server_uid);

        Task<DTO_MqttClientStatistics?> GetClientStatistics(
           string server_uid,
           string server_client_uid
        );

        public Task<DTO_MqttClientSession?> GetClientSession(
            string server_uid,
            string server_client_uid
        );
    }
}