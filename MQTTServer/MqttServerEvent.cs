
namespace Server.Mqtt
{
    public enum MqttServerEvent
    {
        info,
        warning,
        error,
        stateChanged,
        configUpdate,
        clientConnected,
        clientDisconnected,
    }
}