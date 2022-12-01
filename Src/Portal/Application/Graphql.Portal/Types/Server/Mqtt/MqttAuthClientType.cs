using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttAuthClientType
    /// </summary>
    public class MqttAuthClientType : ObjectType<GQL_MqttAuthClient>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttAuthClient> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();
        }
    }
}