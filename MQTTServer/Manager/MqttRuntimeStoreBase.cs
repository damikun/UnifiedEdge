
namespace Server.Manager
{

    public abstract class MqttRuntimeStoreBase : IMqttRuntimeStore
    {

        internal abstract Task<IMQTTServer> HandleAdd(IMQTTServer service);

        internal abstract Task<IMQTTServer?> HandleGetById(string service_id);

        internal abstract Task<string> HandleRemove(string service_id);

        internal abstract Task HandleRemoveAll();

        internal abstract Task<bool> HandleContains(string service_id);

        internal abstract Task<bool> HandleAny();

        internal abstract Task<List<string>> HandlerGetServerIds();

        public async Task<List<string>> GetServerIds()
        {
            return await HandlerGetServerIds();
        }

        public async Task<IMQTTServer?> AddServer(IMQTTServer service)
        {
            if (service == null || string.IsNullOrEmpty(service.ID))
            {
                throw new ArgumentNullException("ID", "Servis or parameter Id is null ref.");
            }

            if (await this.Contains(service.ID))
            {
                throw new Exception("Service allready exist");
            }

            return await HandleAdd(service);
        }

        public Task<bool> Contains(string service_id)
        {
            ValidateServiceId(service_id);

            return HandleContains(service_id);
        }

        public Task<IMQTTServer?> GetById(string service_id)
        {
            ValidateServiceId(service_id);

            return HandleGetById(service_id);
        }

        public async Task<string> Remove(string service_id)
        {
            ValidateServiceId(service_id);

            if (!await this.Contains(service_id))
            {
                return service_id;
            }

            return await HandleRemove(service_id);
        }

        public Task RemoveAll()
        {
            throw new NotImplementedException();
        }

        private void ValidateServiceId(string service_id)
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
    }
}