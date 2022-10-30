using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_Mqtt_ServerStarted
    /// </summary>
    public class Hook_Mqtt_ServerStarted
        : WebHookEventBase<MqttWebHookAction, Hook_Mqtt_ServerStartedPayload>
    {

        public Hook_Mqtt_ServerStarted(Hook_Mqtt_ServerStartedPayload payload)
            : base(MqttWebHookAction.ServerStarted, payload)
        {

        }
    }


    [Serializable]
    public class Hook_Mqtt_ServerStartedPayload
    {
        public string ServerId { get; set; }
    }
}