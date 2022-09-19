using System.Collections.Concurrent;

namespace Server.Manager
{

    public sealed class ServerInMemoryStore : ServerStoreBase
    {
        private readonly ConcurrentDictionary<string, IServer> Store = new ConcurrentDictionary<string, IServer>();

        internal override Task<IServer> HandleAdd(IServer service)
        {
            if (!Store.TryAdd(service.UID, service))
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

        internal override Task<IServer?> HandleGetById(string service_id)
        {
            Store.TryGetValue(service_id, out IServer? service);

            return Task.FromResult(service);
        }

        internal override Task<IServer?> HandleRemove(string service_id)
        {
            Store.TryRemove(service_id, out IServer? service);

            return Task.FromResult(service);
        }

        internal override Task HandleRemoveAll()
        {
            Store.Clear();

            return Task.CompletedTask;
        }

        internal override Task<List<string>> HandlerGetServerIds()
        {
            return Task.FromResult(
                Store.Select(e => e.Key).ToList()
            );
        }
    }
}