using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttTopicStatsType
    /// </summary>
    public class MqttTopicStatsType : ObjectType<GQL_MqttTopicStats>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttTopicStats> descriptor)
        {
            descriptor.Field(e => e.Id).ID();
        }

    }
}