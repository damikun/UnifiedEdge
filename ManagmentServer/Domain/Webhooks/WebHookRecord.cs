
namespace Domain.Server
{
    public class WebHookRecord
    {

        public WebHookRecord() { }

        /// <summary>
        /// Hook record DB Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Linked Webhook Id
        /// </summary>
        public long WebHookID { get; set; }

        /// <summary>
        /// WebHook
        /// </summary>
        public WebHook WebHook { get; set; }

        /// <summary>
        /// HookEventGroup
        /// </summary>
        public HookEventGroup HookEventGroup { get; set; }

        /// <summary>
        /// Unique GUID
        /// </summary>
        public string Guid { get; set; }

        /// <summary>
        /// Hook result enum
        /// </summary>
        public RecordResult Result { get; set; }

        /// <summary>
        /// Response
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Response json
        /// </summary>
        public string ResponseBody { get; set; }

        /// <summary>
        /// Request json
        /// </summary>
        public string RequestBody { get; set; }

        /// <summary>
        /// Request Headers json
        /// </summary>
        public string RequestHeaders { get; set; }

        /// <summary>
        /// Exception
        /// </summary>
        public string Exception { get; set; }

        /// <summary>
        /// Hook Call Timestamp
        /// </summary>
        public DateTime Timestamp { get; set; }
    }


    public enum RecordResult
    {
        undefined = 0,
        ok,
        parameter_error,
        http_error,
        dataQueryError
    }
}