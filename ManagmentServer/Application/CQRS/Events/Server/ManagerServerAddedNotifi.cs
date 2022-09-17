using MediatR;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Aplication.Services.ServerFascade;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Notifi MqttServer was Removed
    /// </summary>
    public class ManagerServerAddedNotifi : ServerBaseNotifi
    {
        public ManagerServerAddedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>ManagerServerAddedNotifi</c>
    /// </summary>
    public class ManagerServerAddedNotifi_Handler : INotificationHandler<ManagerServerAddedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ManagerServerAddedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ManagerServerAddedNotifi</c>
        /// </summary>
        public Task Handle(ManagerServerAddedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    //-------------------------------------------------
    //-------------------------------------------------

    /// <summary>
    /// Command handler for user <c>ManagerServerAddedNotifi</c>
    /// </summary>
    public class ServerAddedToManager_Handler : INotificationHandler<ManagerServerAddedNotifi>
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


        public ServerAddedToManager_Handler(
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
        /// Command handler for <c>ManagerServerAddedNotifi</c>
        /// </summary>
        public Task Handle(ManagerServerAddedNotifi notifi, CancellationToken cancellationToken)
        {
            if (notifi != null)
            {

            }

            return Task.CompletedTask;
        }
    }
}