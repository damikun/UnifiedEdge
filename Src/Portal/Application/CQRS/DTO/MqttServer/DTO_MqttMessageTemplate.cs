using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class DTO_MqttMessageTemplate : IMapFrom<MqttMessageTemplate>
    {
        public long Id { get; set; }

#nullable disable
        public string ServerUid { get; set; }

        public string UserUid { get; set; }
#nullable enable

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