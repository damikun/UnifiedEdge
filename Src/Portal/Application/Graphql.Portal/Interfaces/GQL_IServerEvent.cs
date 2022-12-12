using Aplication.DTO;

namespace Aplication.Graphql.Interfaces
{
    /// <summary>
    /// IServer
    /// </summary>
    public interface GQL_IServerEvent
    {

        // <summary>
        /// ID
        /// </summary>
        public long ID { get; set; }

        // <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        // <summary>
        /// Description
        /// </summary>
        public string? Description { get; set; }

        // <summary>
        /// Type
        /// </summary>
        public ServerEventTypes Type { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime TimeStamp { get; set; }

        // <summary>
        /// AsJson
        /// </summary>
        public string? AsJson { get; set; }
    }
}