using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_Mqtt_ServerStopped
    /// </summary>
    public class Hook_Mqtt_ServerStopped
        : WebHookEventBase<MqttWebHookAction, Hook_Mqtt_ServerStoppedPayload>
    {
        public Hook_Mqtt_ServerStopped()
        {

        }

        public Hook_Mqtt_ServerStopped(Hook_Mqtt_ServerStoppedPayload payload)
            : base(MqttWebHookAction.ServerStopped, payload)
        {

        }
    }


    [Serializable]
    public class Hook_Mqtt_ServerStoppedPayload
    {
        public string ServerId { get; set; }

    }
}