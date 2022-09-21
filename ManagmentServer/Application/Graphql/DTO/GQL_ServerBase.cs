using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{

    public abstract class GQL_ServerBase : GQL_IServer
    {
        public GQL_ServerBase()
        {

        }

        // <summary>
        /// ID
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        // <summary>
        /// Description
        /// </summary>
        public string? Description { get; set; }

        // <summary>
        /// Location
        /// </summary>
        public string? Location { get; set; }

        // <summary>
        /// IsEnabled
        /// </summary>
        public bool IsEnabled { get; set; }

        // <summary>
        /// isRunning
        /// </summary>
        public bool isRunning => State == GQL_ServerState.started;

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

        // <summary>
        /// Uptime
        /// </summary>
        public GQL_Uptime Uptime { get; set; }

        // <summary>
        /// State
        /// </summary>
        public GQL_ServerState State { get; set; }

        // <summary>
        /// Type
        /// </summary>
        public virtual GQL_ServerVariant Type { get; }
    }
}