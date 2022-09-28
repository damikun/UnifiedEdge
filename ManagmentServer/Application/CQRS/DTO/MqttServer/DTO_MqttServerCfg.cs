using AutoMapper;
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttServerCfg : DTO_ServerCfg, IMapFrom<MqttServerCfg>
    {
        public ServerType Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<MqttServerCfg, DTO_MqttServerCfg>()
            .IncludeAllDerived();
        }
    }
}