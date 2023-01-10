using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttMessageTemplateType
    /// </summary>
    public class MqttMessageTemplateType : ObjectType<GQL_MqttMessageTemplate>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttMessageTemplate> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();

            descriptor.Field(e => e.Id)
            .ID(nameof(GQL_MqttServer));
        }
    }
}