using AutoMapper;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_AdapterLog : IMapFrom<DTO_AdapterLog>
    {
        public string Id { get; set; }

        public AdapterState State { get; set; }

        public DateTime TimeStamp { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_AdapterLog, GQL_AdapterLog>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.AdapterId))
            .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State));
        }
    }
}