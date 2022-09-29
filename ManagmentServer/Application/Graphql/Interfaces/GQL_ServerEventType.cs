
namespace Aplication.Graphql.Interfaces
{
    /// <summary>
    /// Graphql IServerEventType
    /// </summary>
    public class IServerEventType : InterfaceType<GQL_IServerEvent>
    {
        protected override void Configure(IInterfaceTypeDescriptor<GQL_IServerEvent> descriptor)
        {
            descriptor.Field(e => e.ID).ID();

            descriptor.Field(e => e.Name);

            descriptor.Field(e => e.Description);

            descriptor.Field(e => e.Type);

            descriptor.Field(e => e.TimeStamp);

            base.Configure(descriptor);
        }
    }
}