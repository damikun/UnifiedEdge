using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{
    public class ServerEventsUnionType : UnionType<GQL_IServerEventUnion>
    {
        protected override void Configure(IUnionTypeDescriptor descriptor)
        {
            descriptor.Type<ClientConnectedType>();
            descriptor.Type<ServerConfigDiffEventType>();
            descriptor.Type<ServerErrorEventType>();
            descriptor.Type<ServerInfoEventType>();
            descriptor.Type<ServerStateChangedEventType>();
        }
    }
}