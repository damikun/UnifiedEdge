namespace Server.Mqtt
{
    public class MqttServerClientDisconnected : ServerEventBase
    {
        public string ClientId { get; set; }
    }
}