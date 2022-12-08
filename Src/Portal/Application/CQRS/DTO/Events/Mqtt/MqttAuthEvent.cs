using Domain.Server;
using System.Collections;
using Aplication.Core;
using Server.Mqtt.DTO;

namespace Aplication.DTO
{
    public class MqttAuthEvent : BaseNotifi
    {
        public string ServerUid { get; set; }

        public long? AuthUserid { get; set; }

        public long? AuthClientId { get; set; }

        public string? Description { get; set; }

        public MqttResultCode Result { get; set; }

        public DTO_MqttAuthArgs Ctx { get; set; }

    }
}