using MediatR;
using Domain.Server;
using System.Collections;

namespace Aplication.DTO
{
    public class MqttAuthEvent : INotification
    {
        public string ServerUid { get; set; }

        public long? AuthUserid { get; set; }

        public long? AuthClientId { get; set; }

        public MqttResultCode Result { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public IDictionary Ctx { get; set; }

    }
}