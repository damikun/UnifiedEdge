
namespace Server.Manager
{
    public interface IMqttRuntimeStore
    {
        public Task<IMQTTService?> GetById(string service_id);

        public Task<List<string>> GetServerIds();

        public Task<IMQTTService?> AddServer(IMQTTService service);

        public Task<string> Remove(string service_id);

        public Task<bool> Contains(string service_id);

        public Task<bool> Any();

        public Task RemoveAll();
    }

}