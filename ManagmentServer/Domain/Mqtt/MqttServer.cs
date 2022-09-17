
namespace Domain.Server
{
    public class MqttServer : ServerBase
    {
        public int Port { get; set; }

        public override ServerType Type => ServerType.mqtt;
    }

}