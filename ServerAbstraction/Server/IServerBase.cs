
namespace Server
{
    public interface IServerBase
    {
        Task<bool> IsRunning();
        TimeSpan? Uptime { get; }
        bool isConfigMatch { get; }
        Task StateChanged(ServerState before, ServerState after);
        void SetConfiguration(IServerCfg cfg);
        Task<ServerState> Handle(ServerCmd cmd, CancellationToken ct = default);
    }
}