namespace Server
{
    public enum MqttState
    {
        unknown,
        stopped,
        stopping,
        restarting,
        starting,
        running
    }
}