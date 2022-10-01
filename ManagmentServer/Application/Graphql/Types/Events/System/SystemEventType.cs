using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerErrorEventType
    /// </summary>
    public class SystemEventType : ObjectType<GQL_SystemEvent>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_SystemEvent> descriptor)
        {

            descriptor.Field(e => e.ID).ID();

        }

        private class Resolvers
        {

        }
    }
}