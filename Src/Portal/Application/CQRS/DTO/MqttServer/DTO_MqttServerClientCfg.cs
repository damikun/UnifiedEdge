using AutoMapper;
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttServerClientCfg : IMapFrom<MqttServerCfg>
    {
        public string Id
        {
            get
            {
                return $"MqttClientCfg.{this.ServerUID}";
            }
        }
        public string ServerUID { get; set; }

        public int CommunicationTimeout { get; set; }

        public bool PresistentSession { get; set; }

        public int MaxPendingMessagesPerClient { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<MqttServerCfg, DTO_MqttServerClientCfg>()
            .ForMember(dest => dest.CommunicationTimeout, opt => opt.MapFrom(src => src.CommunicationTimeout.TotalMilliseconds))
            .IncludeAllDerived();
        }

    }
}