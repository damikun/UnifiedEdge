
namespace Server
{
    public interface IServerBase
    {
        Task<bool> IsRunning();
        TimeSpan? Uptime { get; }
        Task OnStateChanged(ServerState before, ServerState after);
        void SetConfiguration(IServerCfg cfg);
        Task<ServerState> Handle(ServerCmd cmd, CancellationToken ct = default);
    }
}