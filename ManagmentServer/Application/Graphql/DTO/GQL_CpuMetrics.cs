
namespace Aplication.DTO
{

    public class GQL_CpuMetrics
    {
        public GQL_CpuMetrics()
        {

        }

        public string Id { get { return "GQL_CpuMetrics"; } }
        public double TotalCpuUsed { get; set; }
        public double PrivilegedCpuUsed { get; set; }
        public double UserCpuUsed { get; set; }
        public double ThreadCount { get; set; }

    }
}