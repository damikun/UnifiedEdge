using System.Text.Json;
using Aplication.DTO;
// using Newtonsoft.Json;
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

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(ctx.Parent<GQL_ServerStateChangedEvent>());
            }));
        }

        private class Resolvers
        {

        }
    }
}