using Aplication.DTO;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerErrorEventType
    /// </summary>
    public class ServerErrorEventType : ObjectType<GQL_ServerErrorEvent>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerErrorEvent> descriptor)
        {

            descriptor.Implements<IServerEventType>();

            descriptor.Field(e => e.ID).ID();

        }

        private class Resolvers
        {

        }
    }
}