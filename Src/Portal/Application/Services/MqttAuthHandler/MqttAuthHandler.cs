using Server.Mqtt;
using Domain.Server;
using Aplication.DTO;
using Server.Mqtt.DTO;
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

        private async Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateClientInternal(
            string server_uid,
            string client_id,
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            try
            {
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
                    return (true, MqttConnectReasonCode.Success, client.Id);
                }
            }
            catch
            {
                return (true, MqttConnectReasonCode.UnspecifiedError, null);
            }
        }

        public async Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateClient(
            string server_uid,
            string client_id,
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            if (!await IsClientAuthActive(server_uid, ct))
            {
                return (true, MqttConnectReasonCode.Success, null);
            }

            var result = await AuthenticateClientInternal(
                server_uid,
                client_id,
                args,
                ct
            );

            try
            {
                await _publisher.Publish(new MqttAuthEvent()
                {
                    AuthClientId = result.AuthId,
                    AuthUserid = null,
                    Ctx = args,
                    Description = "Client Authentication",
                    Result = (MqttResultCode)result.reason,
                    ServerUid = server_uid,
                });
            }
            catch { }

            return result;
        }

        public async Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateUserInternal(
            string server_uid,
            string user_name,
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            try
            {
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
                    return (true, MqttConnectReasonCode.Success, user.Id);
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
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            if (!await IsUserAuthActive(args.ServerUid, ct))
            {
                return (true, MqttConnectReasonCode.Success, null);
            }

            var result = await AuthenticateUserInternal(
                args.ServerUid,
                args.UserName,
                password,
                args,
                ct
            );

            try
            {
                await _publisher.Publish(new MqttAuthEvent()
                {
                    AuthClientId = null,
                    AuthUserid = result.AuthId,
                    Ctx = args,
                    Description = "User Authentication",
                    Result = (MqttResultCode)result.reason,
                    ServerUid = server_uid,
                });
            }
            catch { }

            return result;
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
