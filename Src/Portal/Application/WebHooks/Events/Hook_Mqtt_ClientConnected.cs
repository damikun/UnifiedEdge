using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_Mqtt_ClientConnected
    /// </summary>
    [Serializable]
    public class Hook_Mqtt_ClientConnected
        : WebHookEventBase<MqttWebHookAction, Hook_Mqtt_ClientConnectedPayload>
    {

        public Hook_Mqtt_ClientConnected()
        {

        }

        public Hook_Mqtt_ClientConnected(Hook_Mqtt_ClientConnectedPayload payload)
            : base(MqttWebHookAction.ClientConnected, payload)
        {

        }
    }


    [Serializable]
    public class Hook_Mqtt_ClientConnectedPayload
    {
        public string ClientUid { get; set; }
        public string ServerUId { get; set; }
    }
}