using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttAuthUser
        : IMapFrom<MqttAuthUser>
    {
        public DTO_MqttAuthUser()
        {

        }

        public long Id { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string UserName { get; set; }
#nullable enable

        public bool System { get; set; }

        public DateTime? LastAuthenticate { get; set; }
    }
}