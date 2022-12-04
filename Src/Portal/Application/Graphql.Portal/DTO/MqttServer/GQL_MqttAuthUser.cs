using Aplication.DTO;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttAuthUser : IMapFrom<DTO_MqttAuthUser>
    {
        public GQL_MqttAuthUser()
        {

        }

        public long Id { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string UserName { get; set; }
#nullable enable

        public DateTime? LastAuthenticate { get; set; }
    }
}