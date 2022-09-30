using Aplication.DTO;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerInfoEventType
    /// </summary>
    public class ServerInfoEventType : ObjectType<GQL_ServerInfoEvent>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerInfoEvent> descriptor)
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