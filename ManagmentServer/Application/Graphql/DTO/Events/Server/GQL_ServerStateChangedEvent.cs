using Aplication.Graphql.Interfaces;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerStateChangedEvent
        : GQL_ServerEventBase, GQL_IServerEventUnion, IMapFrom<DTO_ServerStateChangedEvent>
    {
        public string State { get; set; }
    }
}