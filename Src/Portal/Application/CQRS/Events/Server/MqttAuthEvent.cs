using MediatR;
using System.Text;
using Domain.Server;
using Aplication.DTO;
using System.Text.Json;
using Persistence.Portal;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>MqttAuthEvent</c>
    /// </summary>
    public class MqttAuthEvent_Handler
        : INotificationHandler<MqttAuthEvent>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// JsonSerializerOptions
        /// </summary>
        private readonly JsonSerializerOptions _serializerOptions;

        public MqttAuthEvent_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory
            )
        {
            _logger = logger;
            _factory = factory;

            _serializerOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                IncludeFields = true,
            };
        }

        /// <summary>
        /// Command handler for <c>ManagerNewServerAdded</c>
        /// </summary>
        public async Task Handle(MqttAuthEvent auth_event, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            if (auth_event is null || string.IsNullOrWhiteSpace(auth_event.ServerUid))
            {
                return;
            }

            try
            {
                var server_id = await dbContext.Servers
                .Where(e => e.UID == auth_event.ServerUid)
                .Select(e => e.ID)
                .FirstAsync(cancellationToken);

                if (server_id == default(int) || auth_event.Ctx is null)
                {
                    return;

                }

                var serialized_args = new StringContent(
                    JsonSerializer.Serialize<dynamic>(
                        auth_event.Ctx,
                        _serializerOptions
                    ),
                    Encoding.UTF8,
                    "application/json"
                );

                var json_metadata = await serialized_args
                    .ReadAsStringAsync(cancellationToken);

                var log = new MqttAuthLog()
                {
                    ServerId = server_id,
                    AuthClientId = auth_event.AuthClientId,
                    AuthUserId = auth_event.AuthUserid,
                    Code = auth_event.Result,
                    TimeStamp = auth_event.TimeStamp,
                    JsonMetadata = json_metadata,
                    Description = auth_event.Description,
                    ErrorMessage = auth_event.Result.ToString()
                };

                dbContext.MqttAuthLogs.Add(log);

                await dbContext.SaveChangesAsync(cancellationToken);

            }
            catch (Exception ex)
            {

            }
        }
    }
}