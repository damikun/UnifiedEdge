using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttAuthRule
        : IMapFrom<MqttAuthRule>
    {
        public DTO_MqttAuthRule()
        {

        }

        public long Id { get; set; }

        public string? Topic { get; set; }

        public AuthAction AuthAction { get; set; }

        public MqttAction MqttAction { get; set; }

    }
}