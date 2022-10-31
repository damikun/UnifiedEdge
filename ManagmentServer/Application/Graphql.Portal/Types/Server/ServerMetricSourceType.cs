using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerCmdType
    /// </summary>
    public class ServerMetricsSourceType : EnumType<GQL_MqttServerMetricSource>
    {
        public ServerMetricsSourceType()
        {

        }

        protected override void Configure(IEnumTypeDescriptor<GQL_MqttServerMetricSource> descriptor)
        {


        }
    }
}