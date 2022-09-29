using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ClientConnected :
        DTO_ServerEventBase,
        IMapFrom<ServerClientConnectedEvent>
    {
        public string ClientId { get; set; }
    }
}