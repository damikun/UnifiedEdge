
using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttClient : IMapFrom<DTO_MqttClient>
    {
        public GQL_MqttClient()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }
        // <summary>
        /// ClientId
        /// </summary>
        public string ClientId { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Protocol
        /// </summary>
        public DTO_MqttProtocol Protocol { get; set; }

        // <summary>
        /// ConnectedTimeStamp
        /// </summary>
        public DateTime? ConnectedTimeStamp { get; set; }

        // <summary>
        /// DisconnectedTimeStamp
        /// </summary>
        public DateTime? DisconnectedTimeStamp { get; set; }

        // <summary>
        /// LastMessage
        /// </summary>
        public DateTime? LastMessageTimestamp { get; set; }

        // <summary>
        /// Endpoint
        /// </summary>
        public string? Endpoint { get; set; }


        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttClient, GQL_MqttClient>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Uid))
            .ForMember(dest => dest.Protocol, opt => opt.MapFrom(src => src.Protocol))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid))
            .ForMember(dest => dest.Endpoint, opt => opt.MapFrom(src => src.Endpoint))
            .ForMember(dest => dest.ConnectedTimeStamp, opt => opt.MapFrom(src => src.ConnectedTimeStamp))
            .ForMember(dest => dest.DisconnectedTimeStamp, opt => opt.MapFrom(src => src.DisconnectedTimeStamp))
            .ForMember(dest => dest.LastMessageTimestamp, opt => opt.MapFrom(src => src.LastMessageTimestamp));

            profile.CreateMap<DTO_MqttProtocol, GQL_MqttProtocol>()
                .ConvertUsing(typeof(MqttProtocolVersionEnumMap));
        }


        private class MqttProtocolVersionEnumMap
        : ITypeConverter<DTO_MqttProtocol, GQL_MqttProtocol>
        {
            public GQL_MqttProtocol Convert(
                DTO_MqttProtocol source,
                GQL_MqttProtocol destination,
                ResolutionContext context)
            {

                switch (source)
                {
                    case DTO_MqttProtocol.V310:
                        return GQL_MqttProtocol.V310;
                    case DTO_MqttProtocol.V311:
                        return GQL_MqttProtocol.V311;
                    case DTO_MqttProtocol.V500:
                        return GQL_MqttProtocol.V500;

                    default: return GQL_MqttProtocol.Unknown;
                }
            }
        }

    }
}