
using Server.Mqtt;
using Aplication.DTO;
using MQTTnet.Protocol;
using Persistence.Portal;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Services
{
    public class MqttAuthHandler : IMqttAuthHandler
    {
        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly IPublisher _publisher;

        /// <summary>
        /// Injected <c>IPasswordHasher</c>
        /// </summary>
        private readonly IPasswordHasher _hasher;

        public MqttAuthHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IPublisher publisher,
            IPasswordHasher hasher
        )
        {
            _hasher = hasher;
            _factory = factory;
            _publisher = publisher;
        }

        public async Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateClient(
            string server_uid,
            string client_id,
            CancellationToken ct = default
        )
        {
            try
            {
                if (!await IsClientAuthActive(server_uid, ct))
                {
                    return (true, MqttConnectReasonCode.Success, null);
                }

                var validation_result = ValidateAuthClientInput(
                    server_uid,
                    client_id
                );

                if (!validation_result.isSuccess)
                {
                    return (false, MqttConnectReasonCode.ClientIdentifierNotValid, null);
                }

                var context = await _factory.CreateDbContextAsync(ct);

                var normalised_id = client_id.ToLowerInvariant();

                var client = await context.MqttAuthClients
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    e => e.Server != null &&
                    e.Server.UID == server_uid &&
                    e.ClientId == normalised_id
                );

                if (client is null)
                {
                    return (false, MqttConnectReasonCode.ClientIdentifierNotValid, null);
                }

                if (!client.Enabled)
                {
                    return (true, MqttConnectReasonCode.Banned, null);
                }
                else
                {
                    await _publisher.Publish(new DTO_MqttClientAuthenticated());

                    return (true, MqttConnectReasonCode.Success, client.Id);
                }
            }
            catch
            {
                return (true, MqttConnectReasonCode.UnspecifiedError, null);
            }

        }

        public async Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            CancellationToken ct = default
        )
        {
            try
            {
                if (!await IsUserAuthActive(server_uid, ct))
                {
                    return (true, MqttConnectReasonCode.Success, null);
                }

                var validation_result = ValidateAuthUserInput(
                    server_uid,
                    user_name,
                    password
                );

                if (!validation_result.isSuccess)
                {
                    return (false, MqttConnectReasonCode.UnspecifiedError, null);
                }

                var context = await _factory.CreateDbContextAsync(ct);

                var normalised_name = user_name.ToLowerInvariant();

                var user = await context.MqttAuthUsers
                .AsNoTracking()
                .Where(
                    e => e.Server != null &&
                    e.Server.UID == server_uid &&
                    e.UserName == normalised_name &&
                    e.Enabled == true
                ).FirstOrDefaultAsync(ct);

                if (user is null)
                {
                    return (false, MqttConnectReasonCode.BadUserNameOrPassword, null);
                }

                var result = _hasher.Check(user.Password, password);

                if (!result.Verified)
                {
                    return (false, MqttConnectReasonCode.BadUserNameOrPassword, null);
                }
                else
                {
                    await _publisher.Publish(new DTO_MqttUserAuthenticated());

                    return (true, MqttConnectReasonCode.Success, user.Id);
                }
            }
            catch
            {
                return (true, MqttConnectReasonCode.UnspecifiedError, null);
            }
        }

        public async Task<bool> IsClientAuthActive(string server_uid, CancellationToken ct = default)
        {
            var ctx = await _factory.CreateDbContextAsync(ct);

            return await ctx.MqttAuthConfig
            .Where(e => e.Server != null && e.Server.UID == server_uid)
            .Select(e => e.ClientAuthEnabled)
            .FirstAsync(ct);
        }

        public async Task<bool> IsUserAuthActive(string server_uid, CancellationToken ct = default)
        {
            var ctx = await _factory.CreateDbContextAsync(ct);

            return await ctx.MqttAuthConfig
            .Where(e => e.Server != null && e.Server.UID == server_uid)
            .Select(e => e.UserAuthEnabled)
            .FirstAsync(ct);
        }

        private (bool isSuccess, string reason) ValidateAuthClientInput(
            string server_uid,
            string client_id
        )
        {
            if (string.IsNullOrWhiteSpace(server_uid))
            {
                return (false, $"Invalid server identifier");
            }

            if (string.IsNullOrWhiteSpace(client_id))
            {
                return (false, $"Invalid client identifier");
            }

            return (true, String.Empty);
        }

        private (bool isSuccess, string reason) ValidateAuthUserInput(
            string server_uid,
            string user_name,
            string password
        )
        {
            if (string.IsNullOrWhiteSpace(server_uid))
            {
                return (false, $"Invalid server identifier");
            }

            if (string.IsNullOrWhiteSpace(user_name))
            {
                return (false, $"Invalid username format");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                return (false, $"Invalid password format");
            }

            return (true, String.Empty);
        }
    }
}
