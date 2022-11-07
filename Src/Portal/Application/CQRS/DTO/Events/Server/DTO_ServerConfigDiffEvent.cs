using Aplication.Mapping;
using AutoMapper;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerConfigDiffEvent : DTO_ServerEventBase, IMapFrom<ServerConfigDiffEvent>
    {
        public string? ConfigJson { get; set; }

        public string? CurrentConfigJson { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.Events.ServerConfigDiffEvent, DTO_ServerConfigDiffEvent>()
            .IncludeAllDerived();
        }

    }
}