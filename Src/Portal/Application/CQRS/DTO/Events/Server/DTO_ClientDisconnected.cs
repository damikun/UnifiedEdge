using AutoMapper;
using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ClientDisconnected :
        DTO_ServerEventBase,
        IMapFrom<ServerClientDisconnectedEvent>
    {
        public string ClientId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.Events.ServerClientDisconnectedEvent, DTO_ClientDisconnected>()
            .IncludeAllDerived();
        }
    }
}