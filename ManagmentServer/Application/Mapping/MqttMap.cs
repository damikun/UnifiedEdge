using AutoMapper;
using Aplication.DTO;

namespace Aplication.Mapping
{
    public class Mqtt_Map_Profile : Profile
    {
        public Mqtt_Map_Profile()
        {

            CreateMap<Server.Domain.MqttServer, DTO_MqttServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Port, opt => opt.MapFrom(src => src.Port))
                .ReverseMap();

            CreateMap<DTO_MqttServer, GQL_MqttServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Port, opt => opt.MapFrom(src => src.Port))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();

        }
    }
}