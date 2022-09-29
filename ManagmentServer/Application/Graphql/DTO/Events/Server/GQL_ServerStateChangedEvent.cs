using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerStateChangedEvent : GQL_ServerEventBase, IMapFrom<DTO_ServerStateChangedEvent>
    {
        public string State { get; set; }
    }
}