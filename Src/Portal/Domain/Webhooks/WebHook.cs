
namespace Domain.Server
{
    public class WebHook
    {

        public WebHook()
        {
            this.EventGroup = new HashSet<HookEventGroup>();
            this.Records = new List<WebHookRecord>();
            this.Headers = new HashSet<WebHookHeader>();
        }

        /// <summary>
        /// Hook DB Id  
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Uid 
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// Name 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Webhook endpoint
        /// </summary>
        public string WebHookUrl { get; set; }

        /// <summary>
        /// Webhook endpoint
        /// </summary>
        public string? ServerUid { get; set; }

        /// <summary>
        /// Webhook secret
        /// </summary>
#nullable enable
        public string? Secret { get; set; }
#nullable disable

        /// <summary>
        /// Content Type
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Is active / NotActiv
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// EventGroup
        /// </summary>
        public HashSet<HookEventGroup> EventGroup { get; set; }

        /// <summary>
        /// Timestamp of last hook trigger
        /// </summary>
        /// <value></value>
        public DateTime? LastTrigger { get; set; }

        /// <summary>
        /// Additional HTTP headers. Will be sent with hook.
        /// </summary>
        virtual public HashSet<WebHookHeader> Headers { get; set; }

        /// <summary>
        /// Hook call records history
        /// </summary>
        virtual public ICollection<WebHookRecord> Records { get; set; }
    }
}