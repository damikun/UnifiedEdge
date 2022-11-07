using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{

    public class GQL_MqttClientStatistics : IMapFrom<DTO_MqttClientStatistics>
    {
        public GQL_MqttClientStatistics()
        {

        }

        public string Id { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string ClientUid { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// SentPacketsCount
        /// </summary>
        public long SentPacketsCount { get; set; }

        // <summary>
        /// ReceivedPacketsCount
        /// </summary>
        public long ReceivedPacketsCount { get; set; }

        // <summary>
        /// SentApplicationMessagesCount
        /// </summary>
        public long SentApplicationMessagesCount { get; set; }

        // <summary>
        /// ReceivedApplicationMessagesCount
        /// </summary>
        public long ReceivedApplicationMessagesCount { get; set; }

        // <summary>
        /// BytesSent
        /// </summary>
        public long BytesSent { get; set; }

        // <summary>
        /// BytesReceived
        /// </summary>
        public long BytesReceived { get; set; }

        // <summary>
        /// LastNonKeepAlivePacketReceivedTimestamp
        /// </summary>
        public DateTime? LastNonKeepAlivePacketReceivedTimestamp { get; set; }

        // <summary>
        /// ConnectedTimestamp
        /// </summary>
        public DateTime? ConnectedTimestamp { get; set; }

        // <summary>
        /// LastPacketSentTimestamp
        /// </summary>
        public DateTime? LastPacketSentTimestamp { get; set; }

        // <summary>
        /// LastPacketReceivedTimestamp
        /// </summary>
        public DateTime? LastPacketReceivedTimestamp { get; set; }

        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttClientStatistics, GQL_MqttClientStatistics>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.ClientUid, opt => opt.MapFrom(src => src.ClientUid))
            .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid))
            .ForMember(dest => dest.SentPacketsCount, opt => opt.MapFrom(src => src.SentPacketsCount))
            .ForMember(dest => dest.ReceivedPacketsCount, opt => opt.MapFrom(src => src.ReceivedPacketsCount))
            .ForMember(dest => dest.SentApplicationMessagesCount, opt => opt.MapFrom(src => src.SentApplicationMessagesCount))
            .ForMember(dest => dest.ReceivedApplicationMessagesCount, opt => opt.MapFrom(src => src.ReceivedApplicationMessagesCount))
            .ForMember(dest => dest.BytesSent, opt => opt.MapFrom(src => src.BytesSent))
            .ForMember(dest => dest.BytesReceived, opt => opt.MapFrom(src => src.BytesReceived))
            .ForMember(dest => dest.LastNonKeepAlivePacketReceivedTimestamp, opt => opt.MapFrom(src => src.LastNonKeepAlivePacketReceivedTimestamp))
            .ForMember(dest => dest.ConnectedTimestamp, opt => opt.MapFrom(src => src.ConnectedTimestamp))
            .ForMember(dest => dest.LastPacketSentTimestamp, opt => opt.MapFrom(src => src.LastPacketSentTimestamp))
            .ForMember(dest => dest.LastPacketReceivedTimestamp, opt => opt.MapFrom(src => src.LastPacketReceivedTimestamp));
        }

    }
}