using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerStateChangedEvent : DTO_ServerEventBase, IMapFrom<ServerStateChangedEvent>
    {
        public string State { get; set; }
    }
}