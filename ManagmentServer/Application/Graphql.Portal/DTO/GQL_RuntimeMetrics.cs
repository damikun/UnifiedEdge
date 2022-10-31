
using Aplication.Services.Historian;

namespace Aplication.DTO
{

    public class GQL_RuntimeMetrics
    {
        public GQL_RuntimeMetrics()
        {

        }

        public GQL_CpuMetrics CpuMetrics { get; set; }

        public GQL_MemoryMetrics MemoryMetrics { get; set; }

        public IEnumerable<HistorianRecord> MetricHistory { get; set; }

    }
}