
using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttTopic : IMapFrom<DTO_MqttTopic>
    {
        public GQL_MqttTopic()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// Topic
        /// </summary>
        public string Topic { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Stats
        /// </summary>
        public GQL_MqttTopicStats Stats { get; set; }


        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttTopic, GQL_MqttTopic>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Uid))
            .ForMember(dest => dest.Topic, opt => opt.MapFrom(src => src.Topic))
            .ForMember(dest => dest.Stats, opt => opt.MapFrom(src => src.Stats))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid));
        }
    }
}