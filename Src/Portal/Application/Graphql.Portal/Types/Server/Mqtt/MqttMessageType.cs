using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttTopicType
    /// </summary>
    public class MqttMessageType : ObjectType<GQL_MqttMessage>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttMessage> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.ServerUid).ID(nameof(GQL_MqttServer));

            descriptor.Field(e => e.ClientUid).ID(nameof(GQL_MqttClient));

            descriptor.Field(e => e.TopicUid).ID(nameof(GQL_MqttTopic));
        }

    }
}