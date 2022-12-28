using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttExplorerSubType
    /// </summary>
    public class MqttExplorerSubType : ObjectType<GQL_MqttExplorerSub>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttExplorerSub> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();

            descriptor.Field(e => e.ServerUid)
            .ID(nameof(GQL_MqttServer));

            // descriptor.Field(e => e.TopicUid)
            // .ID(nameof(GQL_MqttTopic));

            descriptor.Field(e => e.UserUid)
            .ID(nameof(GQL_User));
        }
    }
}