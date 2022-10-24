using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ClientDisconnected :
        DTO_ServerEventBase,
        IMapFrom<ServerClientDisconnectedEvent>
    {
        public string ClientId { get; set; }
    }
}