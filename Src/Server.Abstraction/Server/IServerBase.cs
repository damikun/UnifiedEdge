
namespace Server
{
    public interface IServerBase
    {
        string UID { get; }
        Task<bool> IsRunning();
        Task EnableLogging(bool enable);
        TimeSpan? Uptime { get; }
        bool isConfigMatch { get; }
        ServerConfigState ConfigState();
        Task StateChanged(ServerState before, ServerState after);
        void SetConfiguration(IServerCfg cfg);
        abstract void ValidateServerConfig(IServerCfg cfg);
        Task<ServerState> Handle(ServerCmd cmd, CancellationToken ct = default);
    }
}