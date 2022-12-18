using Server.Mqtt;
using IdentityModel;
using Domain.Server;
using Aplication.DTO;
using Server.Mqtt.DTO;
using MQTTnet.Protocol;
using Persistence.Portal;
using Microsoft.EntityFrameworkCore;
using Duende.IdentityServer.Validation;
using Microsoft.Extensions.DependencyInjection;


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

        /// <summary>
        /// Injected <c>IServiceCollection</c>
        /// </summary>
        private readonly IServiceProvider _services;

        private const string OpenIdIdentifier = "OpenId";

        public MqttAuthHandler(
            IPublisher publisher,
            IPasswordHasher hasher,
            IServiceProvider services,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _hasher = hasher;
            _factory = factory;
            _services = services;
            _publisher = publisher;
        }

        private async Task<MqttAuthResult> AuthenticateClientInternal(
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            try
            {
                var validation_result = ValidateAuthClientInput(
                    args.ServerUid,
                    args.ClientId
                );

                if (!validation_result.isSuccess)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.ClientIdentifierNotValid);
                }

                var context = await _factory.CreateDbContextAsync(ct);

                var normalised_id = args.ClientId.ToLowerInvariant();

                var client = await context.MqttAuthClients
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    e => e.Server != null &&
                    e.Server.UID == args.ServerUid &&
                    e.ClientId == normalised_id &&
                    e.Enabled == true
                );

                if (client is null)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.ClientIdentifierNotValid);
                }

                if (!client.Enabled)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.Banned);
                }
                else
                {
                    return new MqttAuthResult()
                    {
                        Result = MqttConnectReasonCode.Success,
                        AuthId = client.Id
                    };
                }
            }
            catch
            {
                return new MqttAuthResult(MqttConnectReasonCode.UnspecifiedError);
            }
        }

        public async Task<MqttAuthResult> AuthenticateClient(
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            if (!await IsClientAuthActive(args.ServerUid, ct))
            {
                return new MqttAuthResult(MqttConnectReasonCode.Success);
            }

            var result = await AuthenticateClientInternal(
                args,
                ct
            );

            try
            {
                if (result.AuthId is not null)
                {

                    await _publisher.Publish(new MqttAuthEvent()
                    {
                        AuthClientId = result.AuthId is not null && result.AuthId is int ? (int)result.AuthId : null,
                        AuthUserid = null,
                        Ctx = args,
                        Description = "Client Authentication",
                        Result = (MqttResultCode)result.Result,
                        ServerUid = args.ServerUid,
                    });
                }

            }
            catch { }

            return result;
        }

        public async Task<MqttAuthResult> AuthenticateUserInternal(
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            try
            {
                var validation_result = ValidateAuthUserInput(
                    ctx.ServerUid,
                    ctx.UserName,
                    password
                );

                if (!validation_result.isSuccess)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.UnspecifiedError);
                }

                var context = await _factory.CreateDbContextAsync(ct);

                var normalised_name = ctx.UserName.ToLowerInvariant();

                var user = await context.MqttAuthUsers
                .AsNoTracking()
                .Where(
                    e => e.Server != null &&
                    e.Server.UID == ctx.ServerUid &&
                    e.UserName == normalised_name &&
                    e.Enabled == true
                ).FirstOrDefaultAsync(ct);

                if (user is null)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.BadUserNameOrPassword);
                }

                var result = _hasher.Check(user.Password, password);

                if (!result.Verified)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.BadUserNameOrPassword);
                }
                else
                {
                    return new MqttAuthResult()
                    {
                        Result = MqttConnectReasonCode.Success,
                        AuthId = user.Id
                    };
                }
            }
            catch
            {
                return new MqttAuthResult(MqttConnectReasonCode.UnspecifiedError);
            }
        }

        private async Task<MqttAuthResult> AuthenticateUserOAuth(
            string token,
            string server_uid,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(token) || string.IsNullOrWhiteSpace(server_uid))
            {
                return new MqttAuthResult(MqttConnectReasonCode.BadUserNameOrPassword);
            }

            TokenValidationResult? result = null;

            try
            {
                var context = await _factory.CreateDbContextAsync(ct);

                // Validat if OpenId user is Enabled
                var open_id_user = await context.MqttAuthUsers
                .AsNoTracking()
                .Where(
                    e => e.Server != null &&
                    e.Server.UID == server_uid &&
                    e.UserName == OpenIdIdentifier &&
                    e.Enabled == true
                ).FirstOrDefaultAsync(ct);

                if (open_id_user is null || !open_id_user.Enabled)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.Banned);
                }

                // Validate OpenId token 
                var token_validator = _services.GetRequiredService<ITokenValidator>();

                result = await token_validator.ValidateAccessTokenAsync(token);

                if (result.IsError)
                {
                    return new MqttAuthResult(MqttConnectReasonCode.BadUserNameOrPassword);
                }
            }
            catch
            {
                return new MqttAuthResult(MqttConnectReasonCode.UnspecifiedError);
            }

            try
            {
                var subject = result.Claims.Where(
                    e => e.Type.Equals(
                        JwtClaimTypes.Subject,
                        StringComparison.OrdinalIgnoreCase
                    )
                );

                return new MqttAuthResult()
                {
                    Result = MqttConnectReasonCode.Success,
                    AuthId = subject
                };
            }
            catch
            {
                return new MqttAuthResult(MqttConnectReasonCode.UnspecifiedError);
            }

        }

        public async Task<MqttAuthResult> AuthenticateUser(
            string password,
            DTO_MqttAuthArgs args,
            CancellationToken ct = default
        )
        {
            if (!await IsUserAuthActive(args.ServerUid, ct))
            {
                return new MqttAuthResult(MqttConnectReasonCode.Success);
            }

            if (string.IsNullOrWhiteSpace(args.UserName) || string.IsNullOrWhiteSpace(password))
            {
                return new MqttAuthResult(MqttConnectReasonCode.BadUserNameOrPassword);
            }

            MqttAuthResult? result = null;

            if (args.UserName.Trim().Equals(OpenIdIdentifier, StringComparison.OrdinalIgnoreCase))
            {
                result = await AuthenticateUserOAuth(password, args.ServerUid, ct);
            }
            else
            {
                result = await AuthenticateUserInternal(
                     password,
                     args,
                     ct
                 );
            }

            try
            {
                if (result.AuthId is not null)
                {
                    await _publisher.Publish(new MqttAuthEvent()
                    {
                        AuthClientId = null,
                        AuthUserid = result.AuthId is not null ? (int)result.AuthId : null,
                        Ctx = args,
                        Description = "User Authentication",
                        Result = (MqttResultCode)result.Result,
                        ServerUid = args.ServerUid,
                    });
                }
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
