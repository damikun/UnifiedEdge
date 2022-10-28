using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_WebHook : IMapFrom<DTO_WebHook>
    {
        public GQL_WebHook()
        {

        }

        // <summary>
        /// Hook DB Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Webhook endpoint
        /// </summary>
        public string WebHookUrl { get; set; }

        /// <summary>
        /// Webhook secret
        /// </summary>
#nullable enable
        public string? Secret { get; set; }

        /// <summary>
        /// Webhook endpoint
        /// </summary>
        public string? ServerUid { get; set; }
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
        public ICollection<HookEventGroup> EventGroup { get; set; }

        /// <summary>
        /// Timestamp of last hook trigger
        /// </summary>
        /// <value></value>
        public DateTime? LastTrigger { get; set; }
    }
}


