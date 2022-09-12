
namespace Server.Manager
{
    public interface IMqttRuntimeStore
    {
        public Task<IMQTTServer?> GetById(string service_id);

        public Task<List<string>> GetServerIds();

        public Task<IMQTTServer?> AddServer(IMQTTServer service);

        public Task<string> Remove(string service_id);

        public Task<bool> Contains(string service_id);

        public Task<bool> Any();

        public Task RemoveAll();
    }

}