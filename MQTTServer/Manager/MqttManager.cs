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

        public async Task<string> RemoveService(string service_id)
        {
            MQTTService service = (await _runtime_store.GetById(service_id) as MQTTService)!;

            using (TransactionScope scope = new TransactionScope())
            {
                if (service == null)
                {
                    throw new Exception(string.Format("Service with id: {0} was not found", service_id));
                }

                await _runtime_store.Remove(service_id);

                scope.Complete();

                _ = Task.Run(service.StopAsync)
                .ContinueWith(e => service.Dispose());

                return service_id;
            }
        }

        public Task<bool> Any()
        {
            return _runtime_store.Any();
        }

        internal async Task<IMQTTService?> GetService(string id)
        {
            return await _runtime_store.GetById(id);
        }

        public async Task<string?> AddServer(MqttServerOptions options, string? id = null)
        {
            var service = string.IsNullOrWhiteSpace(id) ? new MQTTService(options) : new MQTTService(id, options);

            var added = await _runtime_store.AddServer(service);

            return added?.ID;
        }

        public async Task<MqttState> State(string service_id)
        {
            var service = await _runtime_store.GetById(service_id);

            if (service == null)
            {
                return MqttState.unknown;
            }

            return service.StateEnum;
        }

        public Task<bool> Contains(string service_id)
        {
            return _runtime_store.Contains(service_id);
        }
    }
}