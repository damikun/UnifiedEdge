using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttAuthCfgType
    /// </summary>
    public class MqttAuthCfgType : ObjectType<GQL_MqttAuthCfg>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttAuthCfg> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();
        }
    }
}