
namespace Aplication.DTO
{

    public class GQL_MemoryMetrics
    {
        public GQL_MemoryMetrics()
        {

        }

        public string Id { get { return "GQL_MemoryMetrics"; } }
        public double MemoryUssage { get; set; }
        public double GetAlocatedMemory { get; set; }
        public double VirtualMemory { get; set; }
        public double PagedMemory { get; set; }
        public double NonPagedMemory { get; set; }
        public double MemoryWorkingSet { get; set; }

    }
}