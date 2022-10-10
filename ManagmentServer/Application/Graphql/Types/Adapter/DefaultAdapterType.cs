using Aplication.DTO;

namespace Aplication.Graphql.Types
{
    public class DefaultAdapterType : ObjectType<GQL_DefaultAdapter>
    {
        public DefaultAdapterType() { }

        protected override void Configure(
            IObjectTypeDescriptor<GQL_DefaultAdapter> descriptor
        )
        {
            descriptor.Field(e => e.Id).ID();
        }

        private class Resolvers
        {

        }
    }
}