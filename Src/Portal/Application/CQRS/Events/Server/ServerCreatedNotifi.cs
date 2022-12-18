using MediatR;
using Domain.Server;
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
    public class MqttServerRegisterDefaultAuthUsers_Handler
        : INotificationHandler<ServerCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public MqttServerRegisterDefaultAuthUsers_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _logger = logger;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>ServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(ServerCreatedNotifi request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            if (request is null || request.ServerGuid is null)
            {
                return;
            }

            var server = await dbContext.Servers
            .AsNoTracking()
            .Where(e => e.UID == request.ServerGuid)
            .FirstOrDefaultAsync(cancellationToken);

            if (server is null || server.Type != ServerType.mqtt)
            {
                return;
            }

            var openid_user = new MqttAuthUser()
            {
                Enabled = true,
                Password = "",
                ServerId = server.ID,
                UserName = "OpenId",
                System = true
            };

            dbContext.MqttAuthUsers
            .Add(openid_user);

            await dbContext
            .SaveChangesAsync(cancellationToken);
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerCreatedNotifi</c>
    /// </summary>
    public class AddServerToManager_Handler
        : INotificationHandler<ServerCreatedNotifi>
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

        public AddServerToManager_Handler(
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
        /// Command handler for <c>ServerCreatedNotifi</c>
        /// </summary>
        public async Task Handle(ServerCreatedNotifi notifi, CancellationToken cancellationToken)
        {
            if (notifi is null || notifi.ServerGuid is null)
            {
                return;
            }

            try
            {
                await _fascade.AddServer(notifi.ServerGuid);
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);
            }
        }
    }
}