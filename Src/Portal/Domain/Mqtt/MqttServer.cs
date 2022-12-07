
namespace Domain.Server
{
    public class MqttServer : ServerBase
    {
        public override ServerType Type => ServerType.mqtt;

        public virtual ICollection<MqttAuthClient> AuthClients { get; set; }

        public virtual ICollection<MqttAuthUser> AuthUsers { get; set; }

        public virtual ICollection<MqttAuthLog> AuthLogs { get; set; } = new List<MqttAuthLog>();

        public virtual MqttAuthConfig AuthConfig { get; set; } = new MqttAuthConfig();
    }

}