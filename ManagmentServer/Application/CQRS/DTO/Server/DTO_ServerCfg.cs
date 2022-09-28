using AutoMapper;
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_ServerCfg : IMapFrom<ServerBase>
    {
        public string UID { get; init; }

        public bool IsEnabled { get; set; }

        public DateTime TimeStamp { get; init; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServerCfgBase, DTO_ServerCfg>()
            .ForMember(dest => dest.UID, opt => opt.MapFrom(src => src.ServerUID))
            .ForMember(dest => dest.IsEnabled, opt => opt.MapFrom(src => src.IsEnabled))
            .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp));
        }
    }
}