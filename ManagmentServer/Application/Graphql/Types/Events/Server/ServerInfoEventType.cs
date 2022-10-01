using Aplication.DTO;
using System.Text.Json;
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

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(ctx.Parent<GQL_ServerInfoEvent>());
            }));
        }

        private class Resolvers
        {

        }
    }
}