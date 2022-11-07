using Aplication.DTO;
using System.Text.Json;
using Aplication.GraphQL.Resolvers;
using Aplication.Graphql.Interfaces;
using Aplication.Services.ServerFascade;
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

            descriptor.Field(e => e.ServerUid)
            .Type<IdType>()
            .Resolve(async (ctx) =>
            {
                var server_uid = ctx.Parent<GQL_ServerStateChangedEvent>().ServerUid;

                var id_serializer = ctx.Service<IIdSerializer>();

                var server_fascade = ctx.Service<IServerFascade>();

                return await ServerIdResolver.GetServerId(
                    server_uid,
                    id_serializer,
                    server_fascade,
                    ctx.RequestAborted
                );
            });

            descriptor.Field(e => e.AsJson).Resolve((ctx =>
            {
                return JsonSerializer.Serialize(
                    ctx.Parent<GQL_ServerStateChangedEvent>()
                );
            }));
        }

        private class Resolvers
        {

        }
    }
}