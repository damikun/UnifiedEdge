using MediatR;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Duende.IdentityServer.Stores;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Current User personal token by ID
    /// </summary>
    [Authorize(Policy = "read_access")]
    [Authorize(Policy = "authenticated_user")]
    public class GetUserTokenById
        : CommandBase<DTO_Token?>
    {
        public GetUserTokenById(string token_id)
        {
            TokenId = token_id;
        }

        public string TokenId { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUserTokenById Field Validator
    /// </summary>
    public class GetUserTokenByIdValidator
        : AbstractValidator<GetUserTokenById>
    {
        private readonly ICurrentUser _current;

        private readonly IPersistedGrantStore _grant_store;

        public GetUserTokenByIdValidator(
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
             .MustAsync(TokenExist)
             .WithMessage("Token not found");

            async Task<bool> TokenExist(
                GetUserTokenById request,
                CancellationToken ct
            )
            {
                if (string.IsNullOrWhiteSpace(request.TokenId))
                {
                    return false;
                }

                var sub = _current.UserId;

                if (string.IsNullOrWhiteSpace(sub))
                {
                    return false;
                }

                var grant = await _grant_store.GetAsync(request.TokenId);

                return grant.SubjectId.Equals(
                    sub,
                    StringComparison.OrdinalIgnoreCase
                );
            }
        }
    }

    /// <summary>
    /// GetUserTokenById Field Authorization validator
    /// </summary>
    public class GetUserTokenByIdAuthorizationValidator
        : AuthorizationValidator<GetUserTokenById>
    {
        private readonly ICurrentUser _current;

        public GetUserTokenByIdAuthorizationValidator(ICurrentUser current)
        {
            _current = current;

            RuleFor(e => e)
             .Must(UserSubExist)
             .WithMessage("User is not authenticated");
        }

        bool UserSubExist(GetUserTokenById request)
        {
            return !string.IsNullOrWhiteSpace(
                _current.UserId
            );
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUserTokenById</c> command </summary>
    public class GetUserTokenByIdHandler
        : IRequestHandler<GetUserTokenById, DTO_Token?>
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
        public GetUserTokenByIdHandler(
            IPersistedGrantStore grant_store,
            ICurrentUser currentuser
        )
        {
            _grant_store = grant_store;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetUserTokenById</c>
        /// </summary>
        public async Task<DTO_Token?> Handle(
            GetUserTokenById request,
            CancellationToken cancellationToken
        )
        {
            var subject_id = _current.UserId;

            var grant = await _grant_store.GetAsync(request.TokenId);

            if (grant.SubjectId.Equals(subject_id, StringComparison.OrdinalIgnoreCase))
            {
                return new DTO_Token(grant);
            }
            else
            {
                return null;
            }
        }
    }
}