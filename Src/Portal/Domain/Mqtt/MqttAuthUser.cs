namespace Domain.Server
{
    public class MqttAuthUser
    {
        public long Id { get; set; }

        public long? ServerId { get; set; }

        public virtual MqttServer? Server { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string UserName { get; set; }

        public string Password { get; set; }
#nullable enable
    }
}