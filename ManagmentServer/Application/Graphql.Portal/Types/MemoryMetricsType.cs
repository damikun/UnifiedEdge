using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MemoryMetricsType
    /// </summary>
    public class MemoryMetricsType : ObjectType<GQL_MemoryMetrics>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MemoryMetrics> descriptor)
        {
            descriptor.Field(e => e.Id).ID();
        }

    }
}