using AutoMapper;
using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerStateChangedEvent :
        DTO_ServerEventBase,
        IMapFrom<ServerStateChangedEvent>
    {
        public string State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.Events.ServerStateChangedEvent, DTO_ServerStateChangedEvent>()
            .IncludeAllDerived();
        }
    }
}