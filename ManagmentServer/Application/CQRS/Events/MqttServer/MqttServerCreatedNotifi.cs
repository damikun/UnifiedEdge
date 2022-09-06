using MediatR;
using Persistence;
using MQTTnet.Server;
using Server.Manager;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.MqttServer
{

    /// <summary>
    /// Notifi MqttServer was created
    /// </summary>
    public class MqttServerCreatedNotifi : MqttServerBaseNotifi
    {
        public MqttServerCreatedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>MqttServerCreatedNotifi</c>
    /// </summary>
    public class MqttServerCreatedNotifi_Handler : INotificationHandler<MqttServerCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public MqttServerCreatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>MqttServerCreatedNotifi</c>
        /// </summary>
        public Task Handle(MqttServerCreatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    /// <summary>
    /// Command handler for user <c>MqttServerCreatedNotifi</c>
    /// </summary>
    public class AddServerToMqttManager_Handler : INotificationHandler<MqttServerCreatedNotifi>
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

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public AddServerToMqttManager_Handler(
            ILogger logger,
            IMqttManager mqtt_manager,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITelemetry telemetry
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _factory = factory;
            _mqtt_manager = mqtt_manager;
        }

        /// <summary>
        /// Command handler for <c>MqttServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(MqttServerCreatedNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var enity = await dbContext.Servers
            .AsNoTracking()
            .OfType<Server.Domain.MqttServer>()
            .Where(e => e.Guid == notifi.MqttServerGuid)
            .FirstOrDefaultAsync(cancellationToken);

            if (enity == null)
            {
                _telemetry.SetOtelError(
                    string.Format("Server with Guid:{0} was not found", notifi.MqttServerGuid)
                );

                return;
            }

            try
            {
                var option_builder = new MqttServerOptionsBuilder()
                .WithDefaultEndpoint();

                option_builder.WithDefaultEndpointPort(enity.Port);

                var options = option_builder.Build();

                await _mqtt_manager.AddServer(options, enity.Guid)
                .ConfigureAwait(false);

            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}