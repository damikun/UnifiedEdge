
using System.Security.Claims;
using Aplication.Mapping;
using AutoMapper;

namespace Aplication.DTO
{

    public class DTO_Claim : IMapFrom<Claim>
    {
        public DTO_Claim()
        {

        }

        public string? Type { get; set; }

        public string? Value { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Claim, DTO_Claim>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Value));

        }
    }
}