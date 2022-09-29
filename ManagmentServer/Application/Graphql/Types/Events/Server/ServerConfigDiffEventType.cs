using Aplication.DTO;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerConfigDiffEventType
    /// </summary>
    public class ServerConfigDiffEventType : ObjectType<GQL_ServerConfigDiffEvent>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerConfigDiffEvent> descriptor)
        {
            descriptor.Implements<IServerEventType>();

            descriptor.Field(e => e.ID).ID();
        }

        private class Resolvers
        {

        }
    }
}