
namespace Server.Manager
{

    public abstract class ServerStoreBase : IServerStore
    {

        internal abstract Task<IServer> HandleAdd(IServer service);

        internal abstract Task<IServer?> HandleGetById(string service_id);

        internal abstract Task<IServer?> HandleRemove(string service_id);

        internal abstract Task HandleRemoveAll();

        internal abstract Task<bool> HandleContains(string service_id);

        internal abstract Task<bool> HandleAny();

        internal abstract Task<List<string>> HandlerGetServerIds();

        internal abstract Task<IEnumerable<IServer>> HandlerGetAll();

        public async Task<List<string>> GetServerIds()
        {
            return await HandlerGetServerIds();
        }

        public async Task<IServer?> AddServer(IServer service)
        {
            if (service == null || string.IsNullOrEmpty(service.UID))
            {
                throw new ArgumentNullException(
                    nameof(service.UID),
                    "Servis or parameter Id is null ref."
                );
            }

            if (await this.Contains(service.UID))
            {
                throw new Exception("Service allready exist");
            }

            return await HandleAdd(service);
        }

        public Task<bool> Contains(string? service_id)
        {
            ValidateServiceId(service_id);

            return HandleContains(service_id!);
        }

        public Task<IServer?> GetById(string? service_id)
        {
            ValidateServiceId(service_id);

            return HandleGetById(service_id!);
        }

        public async Task<IServer?> Remove(string? service_id)
        {
            ValidateServiceId(service_id);

            if (!await this.Contains(service_id))
            {
                throw new Exception(
                    string.Format(
                        "Server UID: {0} was not found",
                        service_id
                    )
                );
            }

            return await HandleRemove(service_id!);
        }

        public Task RemoveAll()
        {
            return this.HandleRemoveAll();
        }

        private void ValidateServiceId(string? service_id)
        {
            if (string.IsNullOrWhiteSpace(service_id))
            {
                throw new ArgumentNullException(service_id, "Invalid or null argument");
            }
        }

        public Task<bool> Any()
        {
            return this.HandleAny();
        }

        public Task<IEnumerable<IServer>> GetAll()
        {
            return this.HandlerGetAll();
        }
    }
}