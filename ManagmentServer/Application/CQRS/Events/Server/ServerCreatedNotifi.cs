using MediatR;
using Persistence;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server was created
    /// </summary>
    public class ServerCreatedNotifi : ServerBaseNotifi
    {
        public ServerCreatedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>ServerCreatedNotifi</c>
    /// </summary>
    public class ServerCreatedNotifi_Handler : INotificationHandler<ServerCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerCreatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerCreatedNotifi</c>
        /// </summary>
        public Task Handle(ServerCreatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerCreatedNotifi</c>
    /// </summary>
    public class AddServerToManager_Handler : INotificationHandler<ServerCreatedNotifi>
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

        public AddServerToManager_Handler(
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
        /// Command handler for <c>ServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(ServerCreatedNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {
                var db_server_record = await dbContext.Servers
                .AsNoTracking()
                .Include(e => e.Cfg)
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

                await _fascade.AddServer(db_server_record.Cfg);
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}