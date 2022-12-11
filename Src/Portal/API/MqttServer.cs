
namespace Domain.Server
{
    public class MqttServer : ServerBase
    {
        public bool EnableLogging { get; set; }

        public override ServerType Type => ServerType.mqtt;

        public virtual ICollection<MqttAuthUser> AuthUsers { get; set; }

        public virtual ICollection<MqttAuthClient> AuthClients { get; set; }

        public virtual MqttAuthConfig AuthConfig { get; set; } = new MqttAuthConfig();

        public virtual ICollection<MqttAuthLog> AuthLogs { get; set; } = new List<MqttAuthLog>();
    }
}