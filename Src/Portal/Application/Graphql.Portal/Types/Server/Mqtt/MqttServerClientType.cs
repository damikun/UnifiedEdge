using AutoMapper;
using Server.Manager;
using Server.Mqtt.DTO;
using Aplication.Graphql.DataLoaders;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServer Client Type
    /// </summary>
    public class MqttServerClientType : ObjectType<GQL_MqttClient>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerClientType(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttClient> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor
            .Field(e => e.IsConnected)
            .ResolveWith<MqttClientResolvers>(e => e.GetClientState(default!, default!, default));
        }

        public class MqttClientResolvers
        {
            public async Task<bool> GetClientState(
            ClientStateByServerAndClientUids loader,
            [Parent] GQL_MqttClient client,
            CancellationToken cancellationToken)
            => await loader.LoadAsync((client.ServerUid, client.Id), cancellationToken);
        }
    }
}