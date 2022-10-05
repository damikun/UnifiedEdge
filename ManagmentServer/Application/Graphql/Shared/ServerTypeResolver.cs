using Server.Manager;
using Aplication.DTO;
using Aplication.Services.ServerFascade;

namespace Aplication.GraphQL.Resolvers
{
    public static class ServerIdResolver
    {
        public static async Task<string> GetServerId(
            string server_uid,
            [Service] IIdSerializer id_serializer,
            [Service] IServerFascade server_fascade,
            CancellationToken cancellationToken)
        {
            IServerManager server_manager = await server_fascade.GetManager(server_uid);

            var managed_info = server_manager.ManagedServerInfo;

            switch (managed_info.DisplayName)
            {
                case "MQTT":
                    return id_serializer?.Serialize(default!, typeof(GQL_MqttServer).Name, server_uid)!;

                default: throw new Exception("Unsupported server type");
            }
        }
    }
}