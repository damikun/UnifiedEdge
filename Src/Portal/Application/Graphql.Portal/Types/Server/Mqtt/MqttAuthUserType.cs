using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttAuthUserType
    /// </summary>
    public class MqttAuthUserType : ObjectType<GQL_MqttAuthUser>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttAuthUser> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();
        }
    }
}