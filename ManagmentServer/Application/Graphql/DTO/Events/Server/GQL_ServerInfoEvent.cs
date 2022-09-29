using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerInfoEvent : GQL_ServerEventBase, IMapFrom<DTO_ServerInfoEvent>
    {
        public string Message { get; set; }
    }
}