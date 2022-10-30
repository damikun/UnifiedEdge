

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

        public WebHookEventBase(T action, U payload)
        {
            this._action = action;
            this._payload = payload;
        }

        public string Name => this.GetType().Name;

        private T _action { get; set; }

        private U _payload { get; set; }

        public string action
        {
            get { return _action.ToString(); }
        }
        public U payload
        {
            get { return payload; }
        }

        public DateTime timeStamp { get; set; } = DateTime.Now;
    }
}