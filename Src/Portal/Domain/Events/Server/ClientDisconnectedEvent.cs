namespace Domain.Server.Events
{
    public class ServerClientDisconnectedEvent : ServerEventBase
    {
        public ServerClientDisconnectedEvent()
        {
            this.Description = "Client disconnected";
        }

        public string ClientUid { get; set; }
    }
}