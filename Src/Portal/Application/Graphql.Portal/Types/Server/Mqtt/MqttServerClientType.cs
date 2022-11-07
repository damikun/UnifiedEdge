using AutoMapper;
using Server.Manager;
using Server.Mqtt.DTO;

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
            .Field(e => e.RawId)
            .Resolve(e => e.Parent<GQL_MqttClient>().Id);
        }
    }
}