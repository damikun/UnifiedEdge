using AutoMapper;
using Domain.Server;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class DTO_MqttServerEndpoint : IMapFrom<ServerIPv4Endpoint>
    {
        public DTO_MqttServerEndpoint()
        {

        }

        // <summary>
        /// EndpointId
        /// </summary>
        public long EndpointId { get; set; }

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
            // profile.CreateMap<ServerIPv4Endpoint, DTO_MqttServerEndpoint>()
            // .ForMember(dest => dest.EndpointId, opt => opt.MapFrom(src => src.Id);
        }

    }
}