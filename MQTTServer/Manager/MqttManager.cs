using MQTTnet.Server;
using Server.Commander;
using System.Transactions;

namespace Server.Manager
{
    public class MqttManager : IMqttManager
    {
        private readonly IMqttRuntimeStore _runtime_store;

        private readonly IMqttCommander _commander;

        public MqttManager(
            IMqttCommander commander,
            IMqttRuntimeStore? store = null)
        {
            _commander = commander;

            if (store == null)
                store = new MqttRuntimeMemoryStore();

            _runtime_store = store;
        }

        public async Task<ICmdResult> ProcesCommand(string server_id, MqttCommand cmd)
        {
            return await _commander.Process(server_id, cmd);
        }

        public async Task<string> RemoveServer(string Server_id)
        {
            CustomMQTTServer Server = (await _runtime_store.GetById(Server_id) as CustomMQTTServer)!;

            using (TransactionScope scope = new TransactionScope())
            {
                if (Server == null)
                {
                    throw new Exception(string.Format("Server with id: {0} was not found", Server_id));
                }

                await _runtime_store.Remove(Server_id);

                scope.Complete();

                _ = Task.Run(Server.StopAsync)
                .ContinueWith(e => Server.Dispose());

                return Server_id;
            }
        }

        public Task<bool> Any()
        {
            return _runtime_store.Any();
        }

        internal async Task<IMQTTServer?> GetServer(string id)
        {
            return await _runtime_store.GetById(id);
        }

        public async Task<string?> AddServer(MqttServerOptions options, string? id = null)
        {
            var Server = string.IsNullOrWhiteSpace(id) ? new CustomMQTTServer(options) : new CustomMQTTServer(id, options);

            var added = await _runtime_store.AddServer(Server);

            return added?.ID;
        }

        public async Task<MqttState> State(string Server_id)
        {
            var Server = await _runtime_store.GetById(Server_id);

            if (Server == null)
            {
                return MqttState.unknown;
            }

            return Server.StateEnum;
        }

        public Task<bool> Contains(string Server_id)
        {
            return _runtime_store.Contains(Server_id);
        }


        public async Task<TimeSpan?> ServerUptime(string server_id)
        {
            var server = await _runtime_store.GetById(server_id);

            return server?.Uptime;
        }

        public Task<string?> UpdateServer(string server_id, MqttServerOptions options)
        {
            throw new NotImplementedException();
        }
    }
}