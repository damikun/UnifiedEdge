using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql CpuMetricsType
    /// </summary>
    public class CpuMetricsType : ObjectType<GQL_CpuMetrics>
    {
        protected override void Configure(IObjectTypeDescriptor<GQL_CpuMetrics> descriptor)
        {
            descriptor.Field(e => e.Id).ID();
        }
    }
}