using Aplication.Mapping;
using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{
    public class GQL_ServerInfoEvent
        : GQL_ServerEventBase, GQL_IServerEventUnion, IMapFrom<DTO_ServerInfoEvent>
    {
        public string Message { get; set; }
    }
}