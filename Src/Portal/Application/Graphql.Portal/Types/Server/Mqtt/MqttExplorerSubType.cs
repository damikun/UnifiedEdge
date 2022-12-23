using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttExplorerSubType
    /// </summary>
    public class MqttExplorerSubType : ObjectType<GQL_MqttExplorerSub>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttExplorerSub> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();
        }
    }
}