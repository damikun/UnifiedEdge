using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttAuthCfg : IMapFrom<MqttAuthConfig>
    {
        public int Id { get; set; }

        public bool ClientAuthEnabled { get; set; }

        public bool UserAuthEnabled { get; set; }
    }
}