using Aplication.Mapping;
using AutoMapper;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ClientConnected :
        DTO_ServerEventBase,
        IMapFrom<ServerClientConnectedEvent>
    {
        public string ClientId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.Events.ServerClientConnectedEvent, DTO_ClientConnected>()
            .IncludeAllDerived();
        }
    }
}