
namespace Domain.Server
{

    /// <summary>
    /// Represents source hook trigger group
    /// </summary>
    public enum HookEventGroup
    {
        /// <summary>
        /// system events
        /// </summary>
        system,

        /// <summary>
        /// mqtt events
        /// </summary>
        mqtt,

        /// <summary>
        /// OpcUa events
        /// </summary>
        opc,

        /// <summary>
        /// S7Comm protocol events
        /// </summary>
        s7,

    }
}

