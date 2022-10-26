using AutoMapper;
using Server.Manager;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServer TopicStat Type 
    /// </summary>
    public class MqttServerTopic : ObjectType<GQL_MqttServerTopicStat>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerTopic(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServerTopicStat> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

        }

        private class MqttServerTopicStatResolvers
        {

        }
    }
}