using MediatR;
using Persistence;
using Aplication.Services;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.OpcServer
{

    /// <summary>
    /// Notifi OpcServer was created
    /// </summary>
    public class OpcServerCreatedNotifi : OpcServerBaseNotifi
    {
        public OpcServerCreatedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>OpcServerCreatedNotifi</c>
    /// </summary>
    public class OpcServerCreatedNotifi_Handler : INotificationHandler<OpcServerCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public OpcServerCreatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>OpcServerCreatedNotifi</c>
        /// </summary>
        public Task Handle(OpcServerCreatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    /// <summary>
    /// Command handler for user <c>OpcServerCreatedNotifi</c>
    /// </summary>
    public class AddServerToOpcManager_Handler : INotificationHandler<OpcServerCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        // /// <summary>
        // /// Injected <c>IOpcManager</c>
        // /// </summary>
        // private readonly IOpcManager _Opc_manager;

        /// <summary>
        /// Injected <c>ITelemetry</c>
        /// </summary>
        private readonly ITelemetry _telemetry;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public AddServerToOpcManager_Handler(
            ILogger logger,
            // IOpcManager Opc_manager,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITelemetry telemetry
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _factory = factory;
            // _Opc_manager = Opc_manager;
        }

        /// <summary>
        /// Command handler for <c>OpcServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(OpcServerCreatedNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var enity = await dbContext.Servers
            .AsNoTracking()
            .OfType<Server.Domain.OpcServer>()
            .Where(e => e.Guid == notifi.OpcServerGuid)
            .FirstOrDefaultAsync(cancellationToken);

            if (enity == null)
            {
                _telemetry.SetOtelError(
                    string.Format("Server with Guid:{0} was not found", notifi.OpcServerGuid)
                );

                return;
            }

            try
            {
                // implementation
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}