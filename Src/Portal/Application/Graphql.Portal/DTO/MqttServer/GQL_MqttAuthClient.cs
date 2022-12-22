using Aplication.DTO;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttAuthClient
        : IMapFrom<DTO_MqttAuthClient>
    {
        public GQL_MqttAuthClient()
        {

        }

        public long Id { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string ClientId { get; set; }
#nullable enable

        public bool System { get; set; }

        public string? DisplayName { get; set; }

        public List<GQL_MqttAuthRule> Rules { get; set; } = new List<GQL_MqttAuthRule>();

        public DateTime? LastAuthenticate { get; set; }
    }
}