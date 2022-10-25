namespace Server.Mqtt
{
    public class ServerClientDisconnected : ServerEventBase
    {
        public string ClientId { get; set; }
    }
}