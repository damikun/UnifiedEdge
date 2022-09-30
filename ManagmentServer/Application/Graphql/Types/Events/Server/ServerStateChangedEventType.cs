using Aplication.DTO;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerStateChangedEventType
    /// </summary>
    public class ServerStateChangedEventType : ObjectType<GQL_ServerStateChangedEvent>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerStateChangedEvent> descriptor)
        {
            descriptor.Implements<IServerEventType>();

            descriptor.Field(e => e.ID).ID();

            descriptor.Field(e => e.ServerUid).Ignore();
        }

        private class Resolvers
        {

        }
    }
}