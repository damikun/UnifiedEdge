using MediatR;
using Server.Mqtt.DTO;
using Microsoft.Extensions.Logging;


namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi server statistic reseted
    /// </summary>
    public class MqttServerClientStatsResetNotifi : ServerBaseNotifi
    {
        public DTO_MqttClientStatistics Stat { get; set; }

        public MqttServerClientStatsResetNotifi(
            string server_guid,
            DTO_MqttClientStatistics stat
        ) : base(server_guid)
        {
            Stat = stat;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerConfigChangedNotifi</c>
    /// </summary>
    public class MqttServerClientStatsResetNotifi_Handler : INotificationHandler<ServerConfigChangedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttServerClientStatsResetNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerConfigChangedNotifi</c>
        /// </summary>
        public Task Handle(ServerConfigChangedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}