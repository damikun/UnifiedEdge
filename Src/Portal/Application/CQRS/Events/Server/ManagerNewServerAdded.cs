using Server;
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
    public class ManagerNewServerAdded : ServerBaseNotifi
    {
        public ManagerNewServerAdded(string server_guid) : base(server_guid)
        {

        }
    }


    /// <summary>
    /// Command handler for user <c>ManagerNewServerAdded</c>
    /// </summary>
    public class StartServer_Handler : INotificationHandler<ManagerNewServerAdded>
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
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public StartServer_Handler(
            ILogger logger,
            IServerFascade fascade,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITelemetry telemetry,
            Aplication.Services.IPublisher publisher
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _factory = factory;
            _fascade = fascade;
            _publisher = publisher;
        }

        /// <summary>
        /// Command handler for <c>ManagerNewServerAdded</c>
        /// </summary>
        public async Task Handle(ManagerNewServerAdded notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {
                // await _fascade.ProcesCommand(
                //     notifi.ServerGuid,
                //     ServerCmd.start,
                //     cancellationToken
                // );
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}