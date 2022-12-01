using Domain.Server;
using Aplication.DTO;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttAuthRule : IMapFrom<DTO_MqttAuthRule>
    {
        public GQL_MqttAuthRule()
        {

        }

        public long Id { get; set; }

        public string? Topic { get; set; }

        public AuthAction AuthAction { get; set; }

        public MqttAction MqttAction { get; set; }

    }
}