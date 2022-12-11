using AutoMapper;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_MqttServer
        : GQL_ServerBase, IMapFrom<DTO_MqttServer>
    {
        public bool LoggingEnabled { get; set; }

        public GQL_MqttServer()
        {

        }

        public override GQL_ServerVariant Type
        {
            get
            {
                return GQL_ServerVariant.mqtt;
            }
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttServer, GQL_MqttServer>()
            .IncludeAllDerived()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            .ForMember(dest => dest.LoggingEnabled, opt => opt.MapFrom(src => src.LoggingEnabled))
            .ReverseMap();
        }
    }
}