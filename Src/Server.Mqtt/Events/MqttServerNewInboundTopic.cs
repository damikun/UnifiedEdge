namespace Server.Mqtt
{
    public class MqttServerNewInboundTopic : ServerEventBase
    {
        public string Topic { get; set; }
    }
}