
namespace Server
{
    public interface IServer : IServerBase
    {
        public string UID { get; }

        public ServerState State { get; }
    }
}