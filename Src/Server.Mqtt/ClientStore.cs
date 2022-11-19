using Server.Mqtt.DTO;
using System.Collections.Concurrent;


namespace Server.Mqtt
{
    public interface IClientStore
    {
        List<DTO_StoredMqttClient> GetClients();

        void ClearClients();

        bool Contains(string clientUid);

        string GetClientUid(string client_id);

        DTO_StoredMqttClient? AddClient(string? clientId, DTO_MqttProtocol protocol);

        DTO_StoredMqttClient? UpdateClientProtocol(string clientUid, DTO_MqttProtocol protocol);

        DTO_StoredMqttClient? GetClientByUid(string clientUid);
    }


    public class ClientStore : IClientStore
    {
        private readonly ConcurrentDictionary<string, DTO_StoredMqttClient> _store;

        private readonly EdgeMqttServer _server;

        public ClientStore(EdgeMqttServer server)
        {
            _server = server;

            _store = new ConcurrentDictionary<string, DTO_StoredMqttClient>();
        }

        public string GetClientUid(string client_id)
        {
            return DTO_StoredMqttClient.GetUid(_server.UID, client_id);
        }

        public List<DTO_StoredMqttClient> GetClients()
        {
            return _store.Select(e => e.Value).ToList();
        }

        public void ClearClients() => _store.Clear();

        public bool Contains(string clientUid)
        {
            return _store.Keys.Any(e => e == clientUid);
        }

        public DTO_StoredMqttClient? UpdateClientProtocol(string clientUid, DTO_MqttProtocol protocol)
        {
            var client = _store[clientUid];

            if (client is not null)
            {
                client.Protocol = protocol;

                return client;
            }

            return null;
        }

        public DTO_StoredMqttClient? AddClient(string? clientId, DTO_MqttProtocol protocol)
        {
            if (clientId is null)
            {
                return null;
            }

            var client = new DTO_StoredMqttClient()
            {
                ClientId = clientId,
                Protocol = protocol,
                ConnectedTimeStamp = DateTime.Now,
                DisconnectedTimeStamp = null,
                LastMessageTimestamp = DateTime.Now,
            };

            return _store.GetOrAdd(client.Uid, e => client);
        }

        public DTO_StoredMqttClient? GetClientByUid(string clientUid)
        {
            if (clientUid is null)
            {
                return null;
            }

            var client = _store[clientUid];

            if (client is null)
            {
                return null;
            }

            return client;
        }

    }
}