using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_MqttAuthLog
        : IMapFrom<DTO_MqttAuthLog>
    {
        public long Id { get; set; }

        public string? ErrorMessage { get; set; }

        public string? Description { get; set; }

        public MqttResultCode Code { get; set; }

        public bool isSuccess => Code == MqttResultCode.Success;

        public long? AuthClientId { get; set; }

        public long? AuthUserId { get; set; }

        public string? JsonMetadata { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}