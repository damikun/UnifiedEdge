using MQTTnet.Formatter;

namespace Server.Mqtt
{
    public class ServerClientConnected : ServerEventBase
    {
        // <summary>
        /// Id
        /// </summary>
        public string ClientId { get; set; }

        // <summary>
        /// Protocol
        /// </summary>
        public MqttProtocolVersion Protocol { get; set; }

        // <summary>
        /// ConnectedAt
        /// </summary>
        public DateTime? ConnectedAt { get; set; }

    }
}