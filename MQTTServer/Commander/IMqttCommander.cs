
namespace Server.Commander
{
    public interface IMqttCommander
    {
        public Task<ICmdResult> Process(string service_id, MqttCommand cmd);
    }
}