using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_MqttMessageTemplate
        : IMapFrom<DTO_MqttMessageTemplate>
    {
        public long Id { get; set; }

        public string ServerUid { get; set; }

        public MessageContentType ContentType { get; set; }

        public MessageQoS QoS { get; set; }

        public bool Retain { get; set; }

        public int? ExpireInterval { get; set; }

#nullable disable
        public string Payload { get; set; }

        public string Topic { get; set; }
#nullable enable

    }
}