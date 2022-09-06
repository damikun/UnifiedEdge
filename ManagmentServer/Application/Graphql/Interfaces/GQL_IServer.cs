
using Aplication.Interfaces;

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
        public new string Name { get; set; }

        // <summary>
        /// Description
        /// </summary>
        public new string? Description { get; set; }

        // <summary>
        /// Location
        /// </summary>
        public new string? Location { get; set; }

        // <summary>
        /// Updated
        /// </summary>
        public new DateTime Updated { get; set; }
    }
}