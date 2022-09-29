using AutoMapper;
using Domain.Server;
using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerEventBase : IMapFrom<ServerEventBase>
    {
        public string ServerUid { get; set; }

        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public EventType Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServerEventBase, DTO_ServerEventBase>()
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid))
            .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.ID))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
            .IncludeAllDerived()
            .ReverseMap();
        }
    }
}