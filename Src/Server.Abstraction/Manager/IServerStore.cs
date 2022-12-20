
namespace Server.Manager
{
    public interface IServerStore
    {
        public Task<IServer?> GetById(string? service_id);

        public Task<IEnumerable<IServer>> GetAll();

        public Task<List<string>> GetServerIds();

        public Task<IServer?> AddServer(IServer service);

        public Task<IServer?> Remove(string? service_id);

        public Task<bool> Contains(string? service_id);

        public Task<bool> Any();

        public Task RemoveAll();
    }
}