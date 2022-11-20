using Aplication.DTO;
using System.Text.Json;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ClientDisconnectedType
    /// </summary>
    public class ClientDisconnectedType : ObjectType<GQL_ClientDisconnected>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ClientDisconnected> descriptor)
        {
            descriptor.Implements<IServerEventType>();

            descriptor.Field(e => e.ID).ID();

            descriptor.Field(e => e.ServerUid).Ignore();

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(ctx.Parent<GQL_ClientDisconnected>());
            }));
        }

        private class Resolvers
        {

        }
    }
}