
namespace Aplication.Interfaces
{
    public interface IServer
    {
        // <summary>
        /// ID
        /// </summary>
        public string Guid { get; set; }

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
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }
    }
}
