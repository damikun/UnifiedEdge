using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServerClientConfigType
    /// </summary>
    public class MqttServerClientConfigType : ObjectType<GQL_MqttServerClientCfg>
    {

        public MqttServerClientConfigType()
        {

        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServerClientCfg> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.ServerUID).ID(nameof(GQL_MqttServer));
        }

    }
}