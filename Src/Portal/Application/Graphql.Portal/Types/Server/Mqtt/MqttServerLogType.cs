using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServerLogType
    /// </summary>
    public class MqttServerLogType : ObjectType<GQL_MqttServerLog>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServerLog> descriptor)
        {
            descriptor.Field(e => e.Uid)
            .ID();
        }
    }
}