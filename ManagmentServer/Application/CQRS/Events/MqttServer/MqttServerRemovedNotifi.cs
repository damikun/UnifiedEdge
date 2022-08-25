using MediatR;
using Server.Manager;
using Aplication.Services;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.MqttServer
{

    /// <summary>
    /// Notifi MqttServer was Removed
    /// </summary>
    public class MqttServerRemovedNotifi : MqttServerBaseNotifi
    {
        public MqttServerRemovedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>MqttServerRemovedNotifi</c>
    /// </summary>
    public class MqttServerRemovedNotifi_Handler : INotificationHandler<MqttServerRemovedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttServerRemovedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>MqttServerRemovedNotifi</c>
        /// </summary>
        public Task Handle(MqttServerRemovedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    //-------------------------------------------------
    //-------------------------------------------------

    /// <summary>
    /// Command handler for user <c>MqttServerRemovedNotifi</c>
    /// </summary>
    public class RemoveServerFromMqttManager_Handler : INotificationHandler<MqttServerRemovedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>IMqttManager</c>
        /// </summary>
        private readonly IMqttManager _mqtt_manager;

        /// <summary>
        /// Injected <c>ITelemetry</c>
        /// </summary>
        private readonly ITelemetry _telemetry;


        public RemoveServerFromMqttManager_Handler(
            ILogger logger,
            IMqttManager mqtt_manager,
            ITelemetry telemetry
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _mqtt_manager = mqtt_manager;
        }

        /// <summary>
        /// Command handler for <c>MqttServerRemovedNotifi</c>
        /// </summary>
        public async Task Handle(MqttServerRemovedNotifi notifi, CancellationToken cancellationToken)
        {
            if (notifi != null)
            {
                if (string.IsNullOrWhiteSpace(notifi.MqttServerGuid))
                    throw new Exception("Invalid Server Guid");

                await _mqtt_manager.RemoveService(notifi.MqttServerGuid)
                .ConfigureAwait(false);
            }
        }
    }
}