using Aplication.Graphql.Interfaces;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerInfoEvent
        : GQL_ServerEventBase, GQL_IServerEventUnion, IMapFrom<DTO_ServerInfoEvent>
    {
        public string Message { get; set; }
    }
}