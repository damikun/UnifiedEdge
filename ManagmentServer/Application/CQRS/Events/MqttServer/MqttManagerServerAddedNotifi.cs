using MediatR;
using Server.Manager;
using Aplication.Services;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.MqttServer
{

    /// <summary>
    /// Notifi MqttServer was Removed
    /// </summary>
    public class MqttManagerServerAddedNotifi : MqttServerBaseNotifi
    {
        public MqttManagerServerAddedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>MqttManagerServerAddedNotifi</c>
    /// </summary>
    public class MqttManagerServerAddedNotifi_Handler : INotificationHandler<MqttManagerServerAddedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttManagerServerAddedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>MqttManagerServerAddedNotifi</c>
        /// </summary>
        public Task Handle(MqttManagerServerAddedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    //-------------------------------------------------
    //-------------------------------------------------

    /// <summary>
    /// Command handler for user <c>MqttManagerServerAddedNotifi</c>
    /// </summary>
    public class ServerAddedToMqttManager_Handler : INotificationHandler<MqttManagerServerAddedNotifi>
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


        public ServerAddedToMqttManager_Handler(
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
        /// Command handler for <c>MqttManagerServerAddedNotifi</c>
        /// </summary>
        public Task Handle(MqttManagerServerAddedNotifi notifi, CancellationToken cancellationToken)
        {
            if (notifi != null)
            {

            }

            return Task.CompletedTask;
        }
    }
}