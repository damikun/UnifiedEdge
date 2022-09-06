using Server;
using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{

    public class GQL_MqttServer : GQL_IServer
    {
        public GQL_MqttServer()
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
        /// Port
        /// </summary>
        public int Port { get; set; }

        // <summary>
        /// isRunning
        /// </summary>
        public bool isRunning => State == MqttState.running;

        // <summary>
        /// State
        /// </summary>
        public MqttState State { get; set; }

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }
    }
}