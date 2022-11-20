namespace Domain.Server.Events
{
    public class ServerClientConnectedEvent : ServerEventBase
    {
        // public ServerClientConnectedEvent()
        // {
        //     this.Description = "Client connected";
        // }

        public string ClientUid { get; set; }
    }
}