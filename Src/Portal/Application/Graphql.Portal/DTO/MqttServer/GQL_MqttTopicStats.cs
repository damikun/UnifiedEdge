
using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttTopicStats : IMapFrom<DTO_MqttTopicStats>
    {
        public GQL_MqttTopicStats()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// MessagesCount
        /// </summary>
        public long MessagesCount { get; set; }


        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttTopicStats, GQL_MqttTopicStats>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Uid))
            .ForMember(dest => dest.MessagesCount, opt => opt.MapFrom(src => src.MessagesCount));
        }
    }
}