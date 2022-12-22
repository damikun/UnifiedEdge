using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttAuthClient
        : IMapFrom<MqttAuthClient>
    {
        public DTO_MqttAuthClient()
        {

        }

        public long Id { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string ClientId { get; set; }
#nullable enable
        public string? DisplayName { get; set; }

        public bool System { get; set; }

        public DateTime? LastAuthenticate { get; set; }

        public List<DTO_MqttAuthRule> Rules { get; set; } = new List<DTO_MqttAuthRule>();

    }
}