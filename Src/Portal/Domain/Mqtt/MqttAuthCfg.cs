namespace Domain.Server
{
    public class MqttAuthConfig
    {
        public int Id { get; set; }

        public bool RestrictedClientsEnabled { get; set; }

        public bool UserAuthEnabled { get; set; }
    }
}