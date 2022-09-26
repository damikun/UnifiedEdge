using Aplication.DTO;

namespace Aplication.Graphql.Types
{
    public class AdapterType : ObjectType<GQL_Adapter>
    {
        public AdapterType() { }

        protected override void Configure(
            IObjectTypeDescriptor<GQL_Adapter> descriptor
        )
        {
            descriptor.Field(e => e.Id).ID();

        }
    }
}