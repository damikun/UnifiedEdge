

namespace Aplication.Webhooks.Events
{

    public interface IWebHookEventBase { }

    /// <summary>
    /// Base abstract class of WebHook
    /// </summary>
    [Serializable]
    public class WebHookEventBase<T, U>
        : IWebHookEventBase where T : System.Enum
    {

        public WebHookEventBase()
        {
            // Empty constructor is required because of serialization
        }

        public WebHookEventBase(T action, U payload)
        {
            this.Action = action;
            this.Payload = payload;
        }

        public string Name { get { return this.GetType().Name; } }

        public T Action { get; set; }
        public U Payload { get; set; }

        public DateTime timeStamp { get; set; } = DateTime.Now;
    }
}