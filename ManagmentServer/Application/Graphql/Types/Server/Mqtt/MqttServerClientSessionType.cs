using AutoMapper;
using Server.Manager;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{
    /// <summary>
    /// Graphql MqttServer Client Sessions
    /// </summary>
    public class MqttServerClientSessionType : ObjectType<GQL_MqttClientSession>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerClientSessionType(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttClientSession> descriptor)
        {
            descriptor
            .Field(e => e.ClientUid)
            .ID(typeof(GQL_MqttClient).Name);

            descriptor
            .Field(e => e.Uid)
            .ID();
        }
    }
}