
using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttMessage : IMapFrom<DTO_MqttMessage>
    {
        public GQL_MqttMessage()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string? ClientUid { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Payload
        /// </summary>
        public byte[]? Payload { get; set; }

        // <summary>
        /// ContentType
        /// </summary>
        public string? ContentType { get; set; }

        // <summary>
        /// ResponseTopic
        /// </summary>
        public string Topic { get; set; }

        // <summary>
        /// TopicUid
        /// </summary>
        public string? TopicUid { get; set; }

        // <summary>
        /// ResponseTopic
        /// </summary>
        public string? ResponseTopic { get; set; }

        // <summary>
        /// Dup
        /// </summary>
        public bool Dup { get; set; }

        // <summary>
        /// Retain
        /// </summary>
        public bool Retain { get; set; }

        // <summary>
        /// Qos
        /// </summary>
        public byte Qos { get; set; }

        // <summary>
        /// ExpireInterval
        /// </summary>
        public int ExpireInterval { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime TimeStamp { get; set; }


        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttMessage, GQL_MqttMessage>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Uid))
            .ForMember(dest => dest.ClientUid, opt => opt.MapFrom(src => src.ClientUid))
            .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.ContentType))
            .ForMember(dest => dest.Dup, opt => opt.MapFrom(src => src.Dup))
            .ForMember(dest => dest.Payload, opt => opt.MapFrom(src => src.Payload))
            .ForMember(dest => dest.Qos, opt => opt.MapFrom(src => src.Qos))
            .ForMember(dest => dest.ResponseTopic, opt => opt.MapFrom(src => src.ResponseTopic))
            .ForMember(dest => dest.Retain, opt => opt.MapFrom(src => src.Retain))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid))
            .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
            .ForMember(dest => dest.Topic, opt => opt.MapFrom(src => src.Topic))
            .ForMember(dest => dest.TopicUid, opt => opt.MapFrom(src => src.TopicUid));
        }
    }
}