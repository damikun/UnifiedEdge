using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_Mqtt_ClientConnected
    /// </summary>
    public class Hook_Mqtt_ClientConnected
        : WebHookEventBase<MqttWebHookAction, Hook_Mqtt_ClientConnectedPayload>
    {

        public Hook_Mqtt_ClientConnected(Hook_Mqtt_ClientConnectedPayload payload)
            : base(MqttWebHookAction.ClientConnected, payload)
        {

        }
    }


    [Serializable]
    public class Hook_Mqtt_ClientConnectedPayload
    {
        public string ClientId { get; set; }
        public string ServerId { get; set; }
    }
}