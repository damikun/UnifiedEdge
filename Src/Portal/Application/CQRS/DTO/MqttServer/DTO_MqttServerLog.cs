using Server.Mqtt;
using Aplication.Mapping;
using MQTTnet.Diagnostics;

namespace Aplication.DTO
{
    public class DTO_MqttServerLog : IMapFrom<MqttServerLog>
    {
        public long Id { get; set; }
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