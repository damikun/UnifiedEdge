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
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public AddServerToManager_Handler(
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
        /// Command handler for <c>ServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(ServerCreatedNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {
                await _fascade.AddServer(notifi.ServerGuid);

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