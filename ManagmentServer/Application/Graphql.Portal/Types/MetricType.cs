using Aplication.DTO;

namespace Aplication.Graphql.Types
{
    public class MetricType : ObjectType<GQL_Metric>
    {
        public MetricType() { }

        protected override void Configure(IObjectTypeDescriptor<GQL_Metric> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor
            .Field(e => e.Value)
            .Type<AnyType>();
        }
    }
}