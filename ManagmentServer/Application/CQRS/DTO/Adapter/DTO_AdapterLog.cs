using AutoMapper;
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_AdapterLog : IMapFrom<AdapterEvent>
    {
        public string AdapterId { get; set; }

        public AdapterState State { get; set; }

        public DateTime TimeStamp { get; set; }

        public DTO_AdapterLog()
        {

        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<AdapterEvent, DTO_AdapterLog>()
            .ForMember(dest => dest.AdapterId, opt => opt.MapFrom(src => src.AdapterId))
            .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State));
        }
    }
}