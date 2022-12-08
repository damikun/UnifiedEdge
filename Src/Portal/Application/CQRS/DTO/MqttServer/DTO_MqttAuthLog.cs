using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttAuthLog
        : IMapFrom<MqttAuthLog>
    {
        public long Id { get; set; }

        public string? ErrorMessage { get; set; }

        public string? Description { get; set; }

        public MqttResultCode Code { get; set; }

        public long? AuthClientId { get; set; }

        public long? AuthUserId { get; set; }

        public string? JsonMetadata { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}