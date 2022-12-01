using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttAuthRuleType
    /// </summary>
    public class MqttAuthRuleType : ObjectType<GQL_MqttAuthRule>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttAuthRule> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();
        }
    }
}