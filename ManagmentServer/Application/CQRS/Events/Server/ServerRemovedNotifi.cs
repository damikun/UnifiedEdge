using MediatR;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Aplication.Services.ServerFascade;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Notifi Server was Removed
    /// </summary>
    public class ServerRemovedNotifi : ServerBaseNotifi
    {
        public ServerRemovedNotifi(string server_guid)
            : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>ServerRemovedNotifi</c>
    /// </summary>
    public class ServerRemovedNotifi_Handler : INotificationHandler<ServerRemovedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerRemovedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerRemovedNotifi</c>
        /// </summary>
        public Task Handle(ServerRemovedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    //-------------------------------------------------
    //-------------------------------------------------

    /// <summary>
    /// Command handler for user <c>ServerRemovedNotifi</c>
    /// </summary>
    public class RemoveServerFromMqttManager_Handler : INotificationHandler<ServerRemovedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>ITelemetry</c>
        /// </summary>
        private readonly ITelemetry _telemetry;


        public RemoveServerFromMqttManager_Handler(
            ILogger logger,
            IServerFascade fascade,
            ITelemetry telemetry
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>ServerRemovedNotifi</c>
        /// </summary>
        public async Task Handle(ServerRemovedNotifi notifi, CancellationToken cancellationToken)
        {
            if (notifi != null)
            {
                if (string.IsNullOrWhiteSpace(notifi.ServerGuid))
                    throw new Exception("Invalid Server Guid");

                await _fascade.RemoveServer(notifi.ServerGuid);
            }
        }
    }
}