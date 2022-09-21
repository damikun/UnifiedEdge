using Aplication.Mapping;
using AutoMapper;

namespace Aplication.DTO
{

    public class DTO_MqttServer : DTO_Server, IMapFrom<Domain.Server.MqttServer>
    {
        public DTO_MqttServer()
        {

        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.MqttServer, DTO_MqttServer>()
                .IncludeAllDerived()
                .ReverseMap();
        }

    }
}