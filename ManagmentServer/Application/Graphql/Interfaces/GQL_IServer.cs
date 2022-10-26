using Aplication.DTO;

namespace Aplication.Graphql.Interfaces
{
    /// <summary>
    /// IServer
    /// </summary>
    public interface GQL_IServer
    {

        // <summary>
        /// Name
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        // <summary>
        /// ConfigMatch
        /// </summary>
        public bool? IsConfigMatch { get; set; }

        // <summary>
        /// Description
        /// </summary>
        public string? Description { get; set; }

        // <summary>
        /// Location
        /// </summary>
        public string? Location { get; set; }

        // <summary>
        /// State
        /// </summary>
        public GQL_ServerState State { get; set; }

        // <summary>
        /// Type
        /// </summary>
        public GQL_ServerVariant Type { get; }

        // <summary>
        /// ConfigState
        /// </summary>
        public GQL_ServerConfigState? ConfigState { get; set; }

        // <summary>
        /// Uptime
        /// </summary>
        public GQL_Uptime Uptime { get; set; }

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

    }
}