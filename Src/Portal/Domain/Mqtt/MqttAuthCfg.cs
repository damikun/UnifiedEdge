namespace Domain.Server
{
    public class MqttAuthConfig
    {
        public int Id { get; set; }

        public long ServerId { get; set; }

        public virtual MqttServer Server { get; set; }

        public bool ClientAuthEnabled { get; set; }

        public bool UserAuthEnabled { get; set; }
    }
}