using AutoMapper;
using Server.Manager;
using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{
    /// <summary>
    /// Graphql MqttServer Client Statistics
    /// </summary>
    public class MqttServerClientStatisticsType : ObjectType<GQL_MqttClientStatistics>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerClientStatisticsType(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttClientStatistics> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor
            .Field(e => e.ClientUid)
            .ID(typeof(GQL_MqttClient).Name);

            descriptor
            .Field(e => e.ServerUid)
            .ID(typeof(GQL_MqttServer).Name);
        }
    }
}