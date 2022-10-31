using Aplication.DTO;

namespace Aplication.Graphql.Types
{
    public class ServerEventTypeType : EnumType<ServerEventTypes>
    {
        public ServerEventTypeType() { }

        protected override void Configure(IEnumTypeDescriptor<ServerEventTypes> descriptor)
        {


        }
    }
}