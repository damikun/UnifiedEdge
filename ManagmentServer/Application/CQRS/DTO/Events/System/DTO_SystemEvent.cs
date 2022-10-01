using AutoMapper;
using Domain.Event;
using Aplication.Mapping;
using Domain.System.Events;

namespace Aplication.DTO
{
    public class DTO_SystemEvent : IMapFrom<SystemEvent>
    {
        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public string? Json { get; set; }

        public EventType Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<SystemEvent, DTO_SystemEvent>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.ID))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Json, opt => opt.MapFrom(src => src.Json))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
                .ReverseMap();
        }
    }
}