using Aplication.DTO;
using System.Text.Json;
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

            descriptor.Field(e => e.ServerUid).Ignore();

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(ctx.Parent<GQL_ServerConfigDiffEvent>());
            }));
        }

        private class Resolvers
        {

        }
    }
}