using Aplication.Graphql.Interfaces;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ClientConnected
        : GQL_ServerEventBase, GQL_IServerEventUnion, IMapFrom<DTO_ClientConnected>
    {
        public string ClientId { get; set; }
    }
}