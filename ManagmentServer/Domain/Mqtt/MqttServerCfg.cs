
namespace Domain.Server
{
    public class MqttServerCfg : ServerCfgBase
    {
        public int? port { get; set; }

        public override ServerType Type => ServerType.mqtt;
    }
}