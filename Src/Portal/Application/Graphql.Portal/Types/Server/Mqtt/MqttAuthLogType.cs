using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttAuthCfgType
    /// </summary>
    public class MqttAuthLogType : ObjectType<GQL_MqttAuthLog>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttAuthLog> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();

            descriptor.Field(e => e.AuthUserId)
            .ID(nameof(GQL_MqttAuthUser));

            descriptor.Field(e => e.AuthUserId)
            .ID(nameof(GQL_MqttAuthUser));
        }
    }
}