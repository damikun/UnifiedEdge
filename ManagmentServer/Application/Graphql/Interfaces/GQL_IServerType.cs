
namespace Aplication.Graphql.Interfaces
{
    /// <summary>
    /// Graphql IServerType
    /// </summary>
    public class IServerType : InterfaceType<GQL_IServer>
    {
        protected override void Configure(IInterfaceTypeDescriptor<GQL_IServer> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.Name);

            descriptor.Field(e => e.Description);

            descriptor.Field(e => e.Location);

            descriptor.Field(e => e.Updated);

            base.Configure(descriptor);
        }
    }
}