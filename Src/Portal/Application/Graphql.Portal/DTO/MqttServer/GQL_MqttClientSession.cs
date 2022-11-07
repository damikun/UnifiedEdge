using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{

    public class GQL_MqttClientSession : IMapFrom<DTO_MqttClientSession>
    {
        public GQL_MqttClientSession()
        {

        }

        // <summary>
        /// Uid
        /// </summary>
        public string Uid { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

        // <summary>
        /// PendingMessages
        /// </summary>
        public long PendingMessages { get; set; }

        // <summary>
        /// Created
        /// </summary>
        public DateTime? Created { get; set; }

        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttClientSession, GQL_MqttClientSession>()
            .ForMember(dest => dest.Uid, opt => opt.MapFrom(src => src.Uid))
            .ForMember(dest => dest.ClientUid, opt => opt.MapFrom(src => src.ClientUid))
            .ForMember(dest => dest.PendingMessages, opt => opt.MapFrom(src => src.PendingMessages))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created));
        }
    }
}