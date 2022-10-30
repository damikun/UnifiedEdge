using Aplication.Webhooks.Actions;

namespace Aplication.Webhooks.Events
{

    /// <summary>
    /// Hook_System_Started
    /// </summary>
    public class Hook_System_Started
        : WebHookEventBase<SystemWebHookAction, Hook_System_StartedPayload>
    {

        public Hook_System_Started(Hook_System_StartedPayload payload)
            : base(SystemWebHookAction.EdgeStarted, payload)
        {

        }
    }


    [Serializable]
    public class Hook_System_StartedPayload
    {
        public string EdgeUid { get; set; }

        public string? EdgeName { get; set; }
    }
}