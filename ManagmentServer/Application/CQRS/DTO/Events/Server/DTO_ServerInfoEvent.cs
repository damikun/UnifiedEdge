using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerInfoEvent : DTO_ServerEventBase, IMapFrom<ServerInfoEvent>
    {
        public string Message { get; set; }
    }
}