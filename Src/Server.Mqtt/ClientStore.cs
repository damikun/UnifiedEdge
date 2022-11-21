using Server.Mqtt.DTO;
using System.Collections.Concurrent;


namespace Server.Mqtt
{
    public interface IClientStore
    {
        string GetClientUid(string client_id);
        int GetClientsCount();
        Task<int> GetConnectedClientsCount();
        Task<DTO_MqttClientStatistics?> GetClientStatistics(string client_uid);
        Task<DTO_MqttClientSession?> GetClientSession(string client_uid);
        Task<IList<DTO_MqttClientSession>> GetSessions();
        Task<Dictionary<string, bool>> IsConnected(string[] client_uids);
        Task<bool?> IsConnected(string client_uid);
        List<DTO_MqttClient> GetClients();
        bool Contains(string clientUid);
        DTO_MqttClient? UpdateClientConnected(string clientUid, DateTime dt);
        DTO_MqttClient? UpdateClientDisconnected(string clientUid, DateTime dt);
        DTO_MqttClient? UpdateClientLastMessage(string clientUid, DateTime dt);
        DTO_MqttClient? UpdateClientProtocol(string clientUid, DTO_MqttProtocol protocol);
        DTO_MqttClient? UpdateClientEndpoint(string clientUid, string endpoint);
        DTO_MqttClient? UpdateClient(string clientUid, DTO_MqttProtocol protocol, string endpoint);
        DTO_MqttClient? AddClient(string? clientId, DTO_MqttProtocol protocol, string endpoint, bool? connected = true);
        List<DTO_MqttClient> GetClientsByUid(string[] clientsUid);
        DTO_MqttClient? GetClientByUid(string clientUid);
    }


    public class ClientStore : IClientStore
    {
        private readonly ConcurrentDictionary<string, DTO_StoredMqttClient> _store;

        private volatile EdgeMqttServer _server;

        public ClientStore(EdgeMqttServer server)
        {
            _server = server;

            _store = new ConcurrentDictionary<string, DTO_StoredMqttClient>();
        }

        public string GetClientUid(string client_id)
        {
            return DTO_StoredMqttClient.GetUid(_server.UID, client_id);
        }

        public int GetClientsCount() => _store.Count();

        public async Task<int> GetConnectedClientsCount()
        {
            {
                if (_server.Server is null ||
                    _server.isTransition()
                )
                {
                    return 0;
                }

                try
                {
                    var all_ids = _store.Select(e => e.Value.ClientId);

                    var online = await _server.Server.GetClientsAsync();

                    return online.Where(e => all_ids.Contains(e.Id)).Count();
                }
                catch
                {
                    return 0;
                }
            }
        }

        public async Task<DTO_MqttClientStatistics?> GetClientStatistics(string client_uid)
        {

            if (_server is null)
            {
                return null;
            }

            var clinet = GetClientByUid(client_uid);

            if (clinet is null)
            {
                return null;
            }

            try
            {
                if (_server.Server is null ||
                    _server.isTransition())
                {
                    return new DTO_MqttClientStatistics()
                    {
                        ClientUid = clinet.Uid,
                        ServerUid = _server.UID,
                    };
                }


                var client_list = await _server.Server.GetClientsAsync();

                var response_stat = client_list
                .Where(e => e != null && e.Session != null && e.Id.Equals(clinet.ClientId, StringComparison.OrdinalIgnoreCase))
                .Select(e => new DTO_MqttClientStatistics()
                {
                    ClientUid = clinet.Uid,
                    ServerUid = this._server.UID,
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
                })
                .FirstOrDefault();

                if (response_stat is null)
                {
                    return new DTO_MqttClientStatistics()
                    {
                        ClientUid = clinet.Uid,
                        ServerUid = _server.UID,
                    };
                }
                else
                {
                    return response_stat;
                }

            }
            catch { }

            return null;

        }

        public async Task<DTO_MqttClientSession?> GetClientSession(string client_uid)
        {
            if (_server is null ||
                _server.Server is null ||
                _server.isTransition())
            {
                return null;
            }

            try
            {
                var client = GetClientByUid(client_uid);

                if (client == null)
                {
                    return null;
                }

                var client_list = await _server.Server.GetClientsAsync();

                return client_list
                .Where(e => e != null && e.Session != null && e.Id == client.ClientId)
                .Select(e => new DTO_MqttClientSession()
                {
                    ClientUid = DTO_StoredMqttClient.GetUid(_server.UID, e.Id),
                    ServerUid = _server.UID,
                    SessionId = e.Session.Id,
                    Created = e.Session.CreatedTimestamp,
                    PendingMessages = e.Session.PendingApplicationMessagesCount
                }).FirstOrDefault();

            }
            catch { }

            return null;

        }


        public async Task<IList<DTO_MqttClientSession>> GetSessions()
        {
            if (_server is null ||
            _server.Server is null ||
            _server.isTransition())
            {
                return new List<DTO_MqttClientSession>();
            }

            try
            {
                var client_list = await _server.Server.GetClientsAsync();

                return client_list
                .Where(e => e != null && e.Session != null)
                .Select(e => new DTO_MqttClientSession()
                {
                    ClientUid = DTO_StoredMqttClient.GetUid(_server.UID, e.Id),
                    ServerUid = _server.UID,
                    SessionId = e.Session.Id,
                    Created = e.Session.CreatedTimestamp,
                    PendingMessages = e.Session.PendingApplicationMessagesCount
                }).ToList();
            }
            catch { }

            return new List<DTO_MqttClientSession>() as IList<DTO_MqttClientSession>;
        }


        public async Task<Dictionary<string, bool>> IsConnected(string[] client_uids)
        {
            if (client_uids is null || client_uids.Length == 0)
            {
                return new Dictionary<string, bool>();
            }

            if (this._server.Server is null ||
                this._server.isTransition()
            )
            {
                return new Dictionary<string, bool>();
            }

            var clients = GetClientsByUid(client_uids);

            var result = new Dictionary<string, bool>();

            var online_clinets = await _server.Server.GetClientsAsync();

            foreach (var item in clients)
            {
                var isOnline = online_clinets.Any(e => e.Id.Equals(item.ClientId, StringComparison.OrdinalIgnoreCase));

                result.Add(item.Uid, isOnline);
            }

            return result;
        }

        public async Task<bool?> IsConnected(string client_uid)
        {
            if (string.IsNullOrWhiteSpace(client_uid))
            {
                return false;
            }

            if (this._server.Server is null ||
                this._server.isTransition()
            )
            {
                return false;
            }

            try
            {
                var client = GetClientByUid(client_uid);

                if (client is null)
                {
                    return false;
                }

                var clients = await _server.Server.GetClientsAsync();

                return clients.Any(e => e.Id == client.ClientId);
            }
            catch
            {
                return null;
            }

        }

        public List<DTO_MqttClient> GetClients()
        {
            return _store
            .Where(e => e.Value is not null)
            .Select(e => MapStoreDtoToDomainDto(e.Value))
            .ToList();
        }

        protected void ClearClients() => _store.Clear();

        public bool Contains(string clientUid)
        {
            return _store.Keys.Any(e => e == clientUid);
        }

        public DTO_MqttClient? UpdateClientProtocol(string clientUid, DTO_MqttProtocol protocol)
        {
            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.Protocol = protocol;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? UpdateClientLastMessage(string clientUid, DateTime dt)
        {
            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.LastMessageTimestamp = dt;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? UpdateClientDisconnected(string clientUid, DateTime dt)
        {
            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.DisconnectedTimeStamp = dt;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? UpdateClientConnected(string clientUid, DateTime dt)
        {
            try
            {

                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.ConnectedTimeStamp = dt;

                    client.DisconnectedTimeStamp = null;

                    client.LastMessageTimestamp = null;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? UpdateClientEndpoint(string clientUid, string endpoint)
        {
            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.Endpoint = endpoint;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? UpdateClient(string clientUid, DTO_MqttProtocol protocol, string endpoint)
        {
            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is not null)
                {
                    client.Endpoint = endpoint;
                    client.Protocol = protocol;

                    return MapStoreDtoToDomainDto(client);
                }

                return null;
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        public DTO_MqttClient? AddClient(string? clientId, DTO_MqttProtocol protocol, string endpoint, bool? connected = true)
        {
            if (clientId is null || _server?.UID is null)
            {
                return null;
            }

            var client = new DTO_StoredMqttClient()
            {
                ClientId = clientId,
                ServerUid = this._server.UID,
                Protocol = protocol,
                ConnectedTimeStamp = connected == true ? DateTime.Now : null,
                DisconnectedTimeStamp = null,
                LastMessageTimestamp = connected == true ? DateTime.Now : null,
                Endpoint = endpoint,
            };

            var stored = _store.GetOrAdd(client.Uid, e => client);

            return MapStoreDtoToDomainDto(stored);
        }

        public List<DTO_MqttClient> GetClientsByUid(string[] clientsUid)
        {
            if (clientsUid is null)
            {
                return new List<DTO_MqttClient>();
            }

            var clients = _store
            .Where(e => clientsUid.Contains(e.Key))
            .Select(e => MapStoreDtoToDomainDto(e.Value))
            .ToList();

            if (clients is null)
            {
                return new List<DTO_MqttClient>();
            }

            return clients;
        }

        public DTO_MqttClient? GetClientByUid(string clientUid)
        {
            if (clientUid is null)
            {
                return null;
            }

            try
            {
                if (!_store.ContainsKey(clientUid))
                {
                    return null;
                }

                var client = _store[clientUid];

                if (client is null)
                {
                    return null;
                }

                return MapStoreDtoToDomainDto(client);
            }
            catch (KeyNotFoundException ex)
            {
                return null;
            }

        }

        private static DTO_MqttClient MapStoreDtoToDomainDto(DTO_StoredMqttClient clinet)
        {

            if (clinet == null)
            {
                return null;
            };

            return new DTO_MqttClient()
            {
                Uid = clinet.Uid,
                ClientId = clinet.ClientId,
                ServerUid = clinet.ServerUid,
                Protocol = clinet.Protocol,
                ConnectedTimeStamp = clinet.ConnectedTimeStamp,
                DisconnectedTimeStamp = clinet.DisconnectedTimeStamp,
                LastMessageTimestamp = clinet.LastMessageTimestamp,
                Endpoint = clinet.Endpoint
            };
        }
    }
}