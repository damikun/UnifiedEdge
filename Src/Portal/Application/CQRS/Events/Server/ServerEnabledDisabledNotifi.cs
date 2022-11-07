using MediatR;
using Persistence.Portal;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server was created
    /// </summary>
    public class ServerEnabledDisabledNotifi : ServerBaseNotifi
    {
        public bool isEnabled { get; set; }

        public ServerEnabledDisabledNotifi(string server_guid, bool state)
            : base(server_guid)
        {
            isEnabled = state;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerEnabledDisabledNotifi</c>
    /// </summary>
    public class ServerEnabledDisabledNotifi_Handler : INotificationHandler<ServerEnabledDisabledNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerEnabledDisabledNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerEnabledDisabledNotifi</c>
        /// </summary>
        public Task Handle(ServerEnabledDisabledNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerEnabledDisabledNotifi</c>
    /// </summary>
    public class DisableEnableManager_Handler : INotificationHandler<ServerEnabledDisabledNotifi>
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

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public DisableEnableManager_Handler(
            ILogger logger,
            IServerFascade fascade,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITelemetry telemetry
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _factory = factory;
            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>ServerEnabledDisabledNotifi</c>
        /// </summary>
        public async Task Handle(ServerEnabledDisabledNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {
                var db_server_record = await dbContext.Servers
                .AsNoTracking()
                .Where(e => e.UID == notifi.ServerGuid)
                .FirstOrDefaultAsync(cancellationToken);

                if (
                    db_server_record == null ||
                    db_server_record.Cfg == null
                )
                {
                    _telemetry.SetOtelError(
                        string.Format("Server or Data for Guid:{0} not found", notifi.ServerGuid)
                    );

                    return;
                }

                await _fascade.RemoveServer(db_server_record.UID, cancellationToken);
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}