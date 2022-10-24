using Aplication.Graphql.Interfaces;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ClientDisconnected
        : GQL_ServerEventBase, GQL_IServerEventUnion, IMapFrom<DTO_ClientDisconnected>
    {
        public string ClientId { get; set; }
    }
}