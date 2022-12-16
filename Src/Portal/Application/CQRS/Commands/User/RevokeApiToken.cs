using MediatR;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Duende.IdentityServer.Stores;
using Duende.IdentityServer.Models;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// RevokeApiToken
    /// </summary>
    [Authorize(Policy = "write_access")]
    [Authorize(Policy = "authenticated_user")]
    public class RevokeApiToken : CommandBase<DTO_Token>
    {
#nullable disable
        public string TokenId { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RevokeApiToken
    /// </summary>
    public class RevokeApiTokenValidator
        : AbstractValidator<RevokeApiToken>
    {
        private readonly ICurrentUser _current;

        private readonly IPersistedGrantStore _grant_store;

        public RevokeApiTokenValidator(
            ICurrentUser current,
            IPersistedGrantStore grant_store
        )
        {
            _current = current;

            _grant_store = grant_store;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.TokenId)
            .NotNull()
            .NotEmpty();

            RuleFor(e => e)
            .Must(UserSubExist)
            .WithMessage("User is not authenticated");

            RuleFor(e => e)
            .MustAsync(TokenExist)
            .WithMessage("Token not found");

            bool UserSubExist(RevokeApiToken request)
            {
                return !string.IsNullOrWhiteSpace(_current.UserId);
            }

            async Task<bool> TokenExist(RevokeApiToken request, CancellationToken ct)
            {
                if (string.IsNullOrWhiteSpace(request.TokenId))
                {
                    return false;
                }

                var sub_id = _current.UserId;

                if (string.IsNullOrWhiteSpace(sub_id))
                {
                    return false;
                }

                var grant = await grant_store.GetAsync(request.TokenId);

                return grant != null && grant.SubjectId.Equals(
                    sub_id,
                    StringComparison.OrdinalIgnoreCase
                );
            }
        }
    }

    /// <summary>
    /// Authorization validators - RevokeApiToken
    /// </summary>
    public class RevokeApiTokenAuthorizationValidator
        : AuthorizationValidator<RevokeApiToken>
    {
        public RevokeApiTokenAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RevokeApiTokenHandler</c> command </summary>
    public class RevokeApiTokenHandler
        : IRequestHandler<RevokeApiToken, DTO_Token>
    {

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
        public RevokeApiTokenHandler(
            ICurrentUser current,
            IPersistedGrantStore grant_store
        )
        {
            _current = current;

            _grant_store = grant_store;
        }

        /// <summary>
        /// Command handler for <c>RevokeApiToken</c>
        /// </summary>
        public async Task<DTO_Token> Handle(RevokeApiToken request, CancellationToken cancellationToken)
        {
            string sub_id = _current.UserId!;

            PersistedGrant grant = await _grant_store.GetAsync(request.TokenId);

            if (!grant.SubjectId.Equals(sub_id, StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("Grant does not belong to user");
            }

            var dto = new DTO_Token(grant);

            await _grant_store.RemoveAsync(request.TokenId);

            return dto;
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class RevokeApiToken_PostProcessor
        : IRequestPostProcessor<RevokeApiToken, DTO_Token>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public RevokeApiToken_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            RevokeApiToken request,
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