using MediatR;
using System.Text;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Duende.IdentityServer;
using System.Security.Claims;
using Aplication.CQRS.Behaviours;
using Duende.IdentityServer.Stores;
using System.Security.Cryptography;
using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using Duende.IdentityServer.Services;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// GetApiToken
    /// </summary>
    [Authorize(Policy = "write_access")]
    [Authorize(Policy = "authenticated_user")]
    public class GetApiToken : CommandBase<DTO_TokenResponse>
    {
#nullable disable
        public string Description { get; set; }
#nullable enable
        public TokenSkope Scope { get; set; } = TokenSkope.view;

        public TokenLifetime Lifetime { get; set; } = TokenLifetime.day;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - GetApiToken
    /// </summary>
    public class GetApiTokenValidator
        : AbstractValidator<GetApiToken>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly ICurrentUser _current;

        public GetApiTokenValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser current
        )
        {
            _factory = factory;

            _current = current;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Description)
            .NotNull()
            .NotEmpty();

            RuleFor(e => e)
            .Must(UserSubExist)
            .WithMessage("User is not authenticated");

            bool UserSubExist(GetApiToken request)
            {
                return !string.IsNullOrWhiteSpace(_current.UserId);
            }
        }
    }

    /// <summary>
    /// Authorization validators - GetApiToken
    /// </summary>
    public class GetApiTokenAuthorizationValidator
        : AuthorizationValidator<GetApiToken>
    {
        public GetApiTokenAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetApiTokenHandler</c> command </summary>
    public class GetApiTokenHandler
        : IRequestHandler<GetApiToken, DTO_TokenResponse>
    {

        /// <summary>
        /// Injected <c>IIssuerNameService</c>
        /// </summary>
        private readonly IIssuerNameService _issuerNameService;

        /// <summary>
        /// Injected <c>ITokenService</c>
        /// </summary>
        private readonly ITokenService _tokenService;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IPersistedGrantStore</c>
        /// </summary>
        private readonly IPersistedGrantStore _grant_store;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetApiTokenHandler(
            ITokenService tokenService,
            IIssuerNameService issuerNameService,
            ICurrentUser current,
            IPersistedGrantStore grant_store
        )
        {
            _current = current;

            _tokenService = tokenService;

            _grant_store = grant_store;

            _issuerNameService = issuerNameService;
        }

        /// <summary>
        /// Command handler for <c>GetApiToken</c>
        /// </summary>
        public async Task<DTO_TokenResponse> Handle(GetApiToken request, CancellationToken cancellationToken)
        {
            var claims = new List<Claim>
            {
                new("client_id", "api_client"),
                new("scope", "view"),
            };

            if (request.Scope == TokenSkope.viewAndWrite)
            {
                claims.Add(new("scope", "write"));
            }

            var user_sub_id = _current.UserId;

            if (user_sub_id is not null)
            {
                claims.Add(new("sub", user_sub_id));
            }

            var token = new Token(IdentityServerConstants.TokenTypes.AccessToken)
            {
                Issuer = await _issuerNameService.GetCurrentAsync(),
                Lifetime = Convert.ToInt32(GetLifetime(request.Lifetime).TotalSeconds),
                CreationTime = DateTime.UtcNow,
                ClientId = "api_client",

                Claims = claims,

                Description = request.Description,

                IncludeJwtId = true,

                AccessTokenType = AccessTokenType.Reference
            };

            var handle = await _tokenService.CreateSecurityTokenAsync(token);

            var hash = GetHashedKey(handle);

            var grant = await _grant_store.GetAsync(hash);

            return new DTO_TokenResponse()
            {
                Token = new DTO_Token(grant),
                Handle = handle,
            };
        }

        private TimeSpan GetLifetime(TokenLifetime lifetime_enum)
        {
            switch (lifetime_enum)
            {
                case TokenLifetime.hour: return TimeSpan.FromHours(1);
                case TokenLifetime.day: return TimeSpan.FromDays(1);
                case TokenLifetime.week: return TimeSpan.FromDays(7);
                case TokenLifetime.month: return TimeSpan.FromDays(30);
                case TokenLifetime.year: return TimeSpan.FromDays(365);

                default: return TimeSpan.FromDays(1);
            }
        }

        private const string KeySeparator = ":";
        const string HexEncodingFormatSuffix = "-1";

        protected virtual string GetHashedKey(string value)
        {
            var key = (value + KeySeparator + IdentityServerConstants.PersistedGrantTypes.ReferenceToken);

            if (value.EndsWith(HexEncodingFormatSuffix))
            {
                // newer format >= v6; uses hex encoding to avoid collation issues
                using (var sha = SHA256.Create())
                {
                    var bytes = Encoding.UTF8.GetBytes(key);
                    var hash = sha.ComputeHash(bytes);
                    return BitConverter.ToString(hash).Replace("-", "");
                }
            }

            // old format <= v5
            return key.Sha256();
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class GetApiToken_PostProcessor
        : IRequestPostProcessor<GetApiToken, DTO_TokenResponse>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public GetApiToken_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            GetApiToken request,
            DTO_TokenResponse response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                // Notify
            }
        }
    }

}