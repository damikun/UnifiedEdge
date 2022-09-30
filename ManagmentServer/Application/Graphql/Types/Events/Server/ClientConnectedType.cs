using Aplication.DTO;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ClientConnectedType
    /// </summary>
    public class ClientConnectedType : ObjectType<GQL_ClientConnected>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ClientConnected> descriptor)
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