using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttTopicType
    /// </summary>
    public class MqttTopicType : ObjectType<GQL_MqttTopic>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttTopic> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.ServerUid).ID(nameof(GQL_MqttServer));
        }

    }
}