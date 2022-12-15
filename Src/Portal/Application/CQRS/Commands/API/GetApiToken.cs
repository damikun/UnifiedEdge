using MediatR;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Duende.IdentityServer;
using System.Security.Claims;
using Aplication.CQRS.Behaviours;
using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore;
using Duende.IdentityServer.Services;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// GetApiToken
    /// </summary>
    [Authorize]
    public class GetApiToken : CommandBase<DTO_Token>
    {
        public string Description { get; set; }
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

        public GetApiTokenValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Description)
            .NotNull()
            .NotEmpty();
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
        : IRequestHandler<GetApiToken, DTO_Token>
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
        /// Main constructor
        /// </summary>
        public GetApiTokenHandler(
            ITokenService tokenService,
            IIssuerNameService issuerNameService,
            ICurrentUser current
        )
        {
            _current = current;

            _tokenService = tokenService;

            _issuerNameService = issuerNameService;
        }

        /// <summary>
        /// Command handler for <c>GetApiToken</c>
        /// </summary>
        public async Task<DTO_Token> Handle(GetApiToken request, CancellationToken cancellationToken)
        {
            var user_sub_id = _current.UserId;

            var uid = Guid.NewGuid().ToString();

            var claims = new List<Claim>
            {
                new("client_id", "api_client"),
                new("scope", "write"),
                new("scope", "view"),
                new("uid", uid)
            };

            if (user_sub_id is not null)
            {
                claims.Add(new("sub", user_sub_id));
            }

            var token = new Token(IdentityServerConstants.TokenTypes.AccessToken)
            {
                Issuer = await _issuerNameService.GetCurrentAsync(),
                Lifetime = Convert.ToInt32(TimeSpan.FromDays(1).TotalMilliseconds),
                CreationTime = DateTime.UtcNow,
                ClientId = "api_client",

                Claims = claims,

                Description = request.Description,

                IncludeJwtId = true,

                AccessTokenType = AccessTokenType.Reference
            };

            var response_token = await _tokenService.CreateSecurityTokenAsync(token);

            return new DTO_Token()
            {
                Id = uid,
                Token = response_token,
                SubjectId = user_sub_id,
                Description = request.Description
            };
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class GetApiToken_PostProcessor
        : IRequestPostProcessor<GetApiToken, DTO_Token>
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
            DTO_Token response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                // Notify
            }
        }
    }

}