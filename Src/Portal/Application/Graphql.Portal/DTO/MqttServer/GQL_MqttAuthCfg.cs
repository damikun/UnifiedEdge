using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_MqttAuthCfg : IMapFrom<DTO_MqttAuthCfg>
    {
        public int Id { get; set; }

        public bool ClientAuthEnabled { get; set; }

        public bool UserAuthEnabled { get; set; }
    }
}