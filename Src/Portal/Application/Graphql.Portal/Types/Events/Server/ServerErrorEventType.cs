using Aplication.DTO;
using System.Text.Json;
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

            descriptor.Field(e => e.ServerUid).Ignore();

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(ctx.Parent<GQL_ServerErrorEvent>());
            }));
        }

        private class Resolvers
        {

        }
    }
}