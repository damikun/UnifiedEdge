using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql UserType
    /// </summary>
    public class EdgeType : ObjectType<GQL_Edge>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_Edge> descriptor)
        {

            descriptor.Field(e => e.Id).ID();

        }

        private class UserResolvers
        {

        }
    }
}