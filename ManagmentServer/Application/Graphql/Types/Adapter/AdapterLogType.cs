using Aplication.DTO;

namespace Aplication.Graphql.Types
{
    public class AdapterLogType : ObjectType<GQL_AdapterLog>
    {
        public AdapterLogType() { }

        protected override void Configure(
            IObjectTypeDescriptor<GQL_AdapterLog> descriptor
        )
        {
            descriptor.Field(e => e.Id).ID();

        }
    }
}