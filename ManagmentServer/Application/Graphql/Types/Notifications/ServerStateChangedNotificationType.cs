using Aplication.DTO;
using Aplication.GraphQL.Resolvers;
using Aplication.Services.ServerFascade;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerStateChangedNotificationType
    /// </summary>
    public class ServerStateChangedNotificationType : ObjectType<GQL_ServerStateChangedNotification>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerStateChangedNotification> descriptor)
        {
            descriptor
            .Field(e => e.Server_Uid)
            .Type<IdType>()
            .Resolve(async (ctx) =>
            {
                var server_uid = ctx.Parent<GQL_ServerStateChangedNotification>().Server_Uid;

                var id_serializer = ctx.Service<IIdSerializer>();

                var server_fascade = ctx.Service<IServerFascade>();

                return await ServerIdResolver.GetServerId(
                    server_uid,
                    id_serializer,
                    server_fascade,
                    ctx.RequestAborted
                );
            });

            descriptor.Field(e => e.State);
        }

        private class Resolvers
        {

        }
    }
}