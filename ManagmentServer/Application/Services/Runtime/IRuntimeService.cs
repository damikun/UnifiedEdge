
namespace Aplication.Services
{

    public interface IRuntimeService
    {
        public ICollection<string> GetApplicationUrls(Protocol? protocol = Protocol.https);

        public CpuMetrics GetCpuMetrics();

        public SystemInfo GetSystemInfo();

        public MemoryMetrics GetMemoryMetrics();

        public TimeSpan Uptime { get; }

    }
}