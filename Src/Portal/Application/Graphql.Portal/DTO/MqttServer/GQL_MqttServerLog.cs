using Aplication.Mapping;
using MQTTnet.Diagnostics;

namespace Aplication.DTO
{
    public class GQL_MqttServerLog
        : IMapFrom<DTO_MqttServerLog>
    {
#nullable disable
        public string Uid { get; set; }
#nullable enable
        public MqttNetLogLevel LogLevel { get; set; }

        public string? Source { get; set; }

        public string? Message { get; set; }

        public string? Exception { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}