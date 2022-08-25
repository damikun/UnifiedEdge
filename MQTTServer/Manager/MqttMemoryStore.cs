using System.Collections.Concurrent;

namespace Server.Manager
{

    public sealed class MqttRuntimeMemoryStore : MqttRuntimeStoreBase
    {
        private readonly ConcurrentDictionary<string, IMQTTService> Store = new ConcurrentDictionary<string, IMQTTService>();

        internal override Task<IMQTTService> HandleAdd(IMQTTService service)
        {
            if (!Store.TryAdd(service.ID, service))
            {
                throw new Exception("Failed to add item to in-memory store");
            }

            return Task.FromResult(service);
        }

        internal override Task<bool> HandleContains(string service_id)
        {
            return Task.FromResult((Store.Any(e => e.Key == service_id)));
        }

        internal override Task<bool> HandleAny()
        {
            return Task.FromResult((Store.Any()));
        }

        internal override Task<IMQTTService?> HandleGetById(string service_id)
        {
            Store.TryGetValue(service_id, out IMQTTService? service);

            return Task.FromResult(service);
        }

        internal override Task<string> HandleRemove(string service_id)
        {
            Store.TryRemove(service_id, out IMQTTService? service);

            return Task.FromResult(service_id);
        }

        internal override Task HandleRemoveAll()
        {
            Store.Clear();

            return Task.CompletedTask;
        }

        internal override Task<List<string>> HandlerGetServerIds()
        {
            return Task.FromResult(Store.Select(e => e.Key).ToList());
        }
    }
}