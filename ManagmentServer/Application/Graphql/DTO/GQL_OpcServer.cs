using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{
    public class GQL_OpcServer : GQL_ServerBase, GQL_IServer
    {
        public GQL_OpcServer()
        {

        }

        public override GQL_ServerVariant Type
        {
            get
            {
                return GQL_ServerVariant.opc;
            }
        }
    }
}