using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttServerEndpoint : IMapFrom<DTO_MqttServerEndpoint>
    {
        public GQL_MqttServerEndpoint()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// IPAddress
        /// </summary>
        public string IPAddress { get; set; }

        // <summary>
        /// Port
        /// </summary>
        public long Port { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttServerEndpoint, GQL_MqttServerEndpoint>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.EndpointId))
            .ForMember(dest => dest.IPAddress, opt => opt.MapFrom(src => src.IPAddress))
            .ForMember(dest => dest.Port, opt => opt.MapFrom(src => src.Port))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid));
        }

    }
}