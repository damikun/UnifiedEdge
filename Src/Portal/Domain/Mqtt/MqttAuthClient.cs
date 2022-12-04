namespace Domain.Server
{
    public class MqttAuthClient
    {
        public long Id { get; set; }

        public long? ServerId { get; set; }

        public virtual MqttServer? Server { get; set; }

        public bool Enabled { get; set; }
#nullable disable
        public string ClientId { get; set; }
#nullable enable

        public ICollection<MqttAuthRule> Rules { get; set; } = new List<MqttAuthRule>();

        public DateTime? LastAuthenticate { get; set; }
    }
}