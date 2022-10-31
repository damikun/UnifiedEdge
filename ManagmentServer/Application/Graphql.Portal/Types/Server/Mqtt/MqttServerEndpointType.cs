using AutoMapper;
using Server.Manager;
using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MMqttServerEndpointType
    /// </summary>
    public class MqttServerEndpointType : ObjectType<GQL_MqttServerEndpoint>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerEndpointType(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServerEndpoint> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor
            .Field(e => e.ServerUid)
            .ID(typeof(GQL_MqttServer).Name);
        }
    }
}