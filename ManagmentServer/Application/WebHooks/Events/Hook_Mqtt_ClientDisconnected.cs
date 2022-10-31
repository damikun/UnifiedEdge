using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_Mqtt_ClientDisconnected
    /// </summary>
    public class Hook_Mqtt_ClientDisconnected
        : WebHookEventBase<MqttWebHookAction, Hook_Mqtt_ClientDisconnectedPayload>
    {
        public Hook_Mqtt_ClientDisconnected()
        {

        }

        public Hook_Mqtt_ClientDisconnected(Hook_Mqtt_ClientDisconnectedPayload payload)
            : base(MqttWebHookAction.ClientDisconnected, payload)
        {

        }
    }


    [Serializable]
    public class Hook_Mqtt_ClientDisconnectedPayload
    {
        public string ClientId { get; set; }

        public string ServerId { get; set; }
    }
}