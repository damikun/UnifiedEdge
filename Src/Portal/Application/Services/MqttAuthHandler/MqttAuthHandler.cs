
using Server.Mqtt;
using Aplication.DTO;
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

        public async Task<(bool result, string? message)> AuthenticateClient(
            string server_uid,
            string client_id,
            CancellationToken ct = default
        )
        {
            try
            {
                if (!await IsClientAuthActive(ct))
                {
                    return (true, "Authentication disabled");
                }


                var validation_result = ValidateAuthClientInput(
                    server_uid,
                    client_id
                );

                if (!validation_result.isSuccess)
                {
                    return (false, validation_result.message);
                }

                var context = await _factory.CreateDbContextAsync(ct);

                var normalised_id = client_id.ToLowerInvariant();

                var exist = await context.MqttAuthClients
                .AsNoTracking()
                .AnyAsync(
                    e => e.Server != null &&
                    e.Server.UID == server_uid &&
                    e.ClientId == normalised_id &&
                    e.Enabled == true
                );

                if (!exist)
                {
                    return (false, "Client not found");
                }
                else
                {
                    await _publisher.Publish(new DTO_MqttClientAuthenticated());

                    return (true, "Authentication success");
                }
            }
            catch
            {
                return (true, "Internall Auth error");
            }

        }

        public async Task<(bool result, string? message)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            CancellationToken ct = default
        )
        {
            try
            {
                if (!await IsUserAuthActive(ct))
                {
                    return (true, "Authentication disabled");
                }

                var validation_result = ValidateAuthUserInput(
                    server_uid,
                    user_name,
                    password
                );

                if (!validation_result.isSuccess)
                {
                    return (false, validation_result.message);
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
                    return (false, "AuthUser not found");
                }

                var result = _hasher.Check(user.Password, password);

                if (!result.Verified)
                {
                    return (false, "Invalid AuthUser password");
                }
                else
                {
                    await _publisher.Publish(new DTO_MqttUserAuthenticated());

                    return (true, "Authentication success");
                }
            }
            catch
            {
                return (true, "Internall Auth error");
            }
        }

        public async Task<bool> IsClientAuthActive(CancellationToken ct = default)
        {
            var ctx = await _factory.CreateDbContextAsync(ct);

            var auth_cfg = await ctx.MqttAuthConfig.FirstOrDefaultAsync(ct);

            if (auth_cfg is null)
            {
                throw new Exception("Unable to load auth config");
            }

            return auth_cfg.RestrictedClientsEnabled;
        }

        public async Task<bool> IsUserAuthActive(CancellationToken ct = default)
        {
            var ctx = await _factory.CreateDbContextAsync(ct);

            var auth_cfg = await ctx.MqttAuthConfig.FirstOrDefaultAsync(ct);

            if (auth_cfg is null)
            {
                throw new Exception("Unable to load auth config");
            }

            return auth_cfg.UserAuthEnabled;
        }

        private (bool isSuccess, string? message) ValidateAuthClientInput(
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

        private (bool isSuccess, string? message) ValidateAuthUserInput(
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
