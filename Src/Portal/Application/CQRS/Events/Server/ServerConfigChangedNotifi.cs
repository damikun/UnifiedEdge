using System;
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
    public class ServerConfigChangedNotifi : ServerBaseNotifi
    {
        public ServerConfigChangedNotifi(string server_guid) : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>ServerConfigChangedNotifi</c>
    /// </summary>
    public class ServerConfigChangedNotifi_Handler : INotificationHandler<ServerConfigChangedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerConfigChangedNotifi_Handler(ILogger logger)
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

    /// <summary>
    /// Command handler for user <c>ServerConfigChangedNotifi</c>
    /// </summary>
    public class UpdateConfigManager_Handler : INotificationHandler<ServerConfigChangedNotifi>
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
        /// Injected <c>IConfigMapper</c>
        /// </summary>
        private readonly IConfigMapper _cfg_mapper;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateConfigManager_Handler(
            ILogger logger,
            IServerFascade fascade,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITelemetry telemetry,
            IConfigMapper cfg_mapper
            )
        {
            _telemetry = telemetry;
            _logger = logger;
            _factory = factory;
            _fascade = fascade;
            _cfg_mapper = cfg_mapper;
        }

        /// <summary>
        /// Command handler for <c>ServerConfigChangedNotifi</c>
        /// </summary>
        public async Task Handle(ServerConfigChangedNotifi notifi, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {
                var cfg = await _cfg_mapper.GetServerConfig(notifi.ServerGuid);

                var manager = await _fascade.GetManager(notifi.ServerGuid);

                await manager.UpdateServer(cfg);
            }
            catch (Exception ex)
            {
                // Console.WriteLine(ex.ToString());

                _telemetry.SetOtelError(ex);
            }
        }
    }
}