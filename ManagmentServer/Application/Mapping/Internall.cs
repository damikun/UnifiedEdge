using Domain;
using AutoMapper;
using Aplication.DTO;

namespace Aplication.Mapping
{
    public class Internall_Profile : Profile
    {
        public Internall_Profile()
        {

            // CreateMap<Edge, DTO_Edge>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location1, opt => opt.MapFrom(src => src.Location1))
            //     .ForMember(dest => dest.Location2, opt => opt.MapFrom(src => src.Location2))
            //     .ForMember(dest => dest.Location3, opt => opt.MapFrom(src => src.Location3))
            //     .ReverseMap();

            // CreateMap<DTO_Edge, GQL_Edge>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location1, opt => opt.MapFrom(src => src.Location1))
            //     .ForMember(dest => dest.Location2, opt => opt.MapFrom(src => src.Location2))
            //     .ForMember(dest => dest.Location3, opt => opt.MapFrom(src => src.Location3))
            //     .ReverseMap();
        }
    }
}