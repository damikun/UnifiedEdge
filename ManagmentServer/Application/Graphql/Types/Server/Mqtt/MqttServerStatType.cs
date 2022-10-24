using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServerStats Type 
    /// </summary>
    public class MqttServerStatsType : ObjectType<GQL_MqttServerStats>
    {

        public MqttServerStatsType()
        {

        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServerStats> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.ServerUid).Ignore();
        }

        private class MqttServerStatTypeResolvers
        {

        }
    }
}