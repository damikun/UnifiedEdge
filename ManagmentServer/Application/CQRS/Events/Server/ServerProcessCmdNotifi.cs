using Server;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Notifi server command triggered
    /// </summary>
    public class ServerProcessCmdNotifi : ServerBaseNotifi
    {
        public ServerCmd Command { get; set; }

        public ServerProcessCmdNotifi(string server_guid, ServerCmd cmd)
        : base(server_guid)
        {
            Command = cmd;
        }
    }


    /// <summary>
    /// Command handler for user <c>ServerProcessCmdNotifi</c>
    /// </summary>
    public class ServerProcessCmdNotifi_Handler
        : INotificationHandler<ServerProcessCmdNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerProcessCmdNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerProcessCmdNotifi</c>
        /// </summary>
        public Task Handle(
            ServerProcessCmdNotifi request,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }
}