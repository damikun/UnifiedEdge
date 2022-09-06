using Aplication.Interfaces;

namespace Aplication.DTO
{

    public class DTO_MqttServer : IServer
    {
        public DTO_MqttServer()
        {

        }

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
        /// Port
        /// </summary>
        public int Port { get; set; }

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

        // <summary>
        /// Created
        /// </summary>
        public DateTime Created { get; set; }

    }
}