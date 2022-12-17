using MediatR;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using System.Text.Json;
using Aplication.Services;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Stores;
using Microsoft.EntityFrameworkCore;
using Duende.IdentityServer.Stores.Serialization;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Current User personal tokens
    /// </summary>
    [Authorize(Policy = "read_access")]
    [Authorize(Policy = "authenticated_user")]
    public class GetUserTokens
        : CommandBase<DTO_Connection<DTO_Token>>
    {
        public GetUserTokens(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUserTokens Field Validator
    /// </summary>
    public class GetUserTokensValidator
        : AbstractValidator<GetUserTokens>
    {
        private readonly ICurrentUser _current;

        public GetUserTokensValidator(ICurrentUser current)
        {
            _current = current;
        }
    }

    /// <summary>
    /// GetUserTokens Field Authorization validator
    /// </summary>
    public class GetUserTokensAuthorizationValidator
        : AuthorizationValidator<GetUserTokens>
    {
        private readonly ICurrentUser _current;

        public GetUserTokensAuthorizationValidator(ICurrentUser current)
        {
            _current = current;

            RuleFor(e => e)
            .Must(UserSubExist)
            .WithMessage("User is not authenticated");
        }

        bool UserSubExist(GetUserTokens request)
        {
            return !string.IsNullOrWhiteSpace(
                _current.UserId
            );
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUserTokens</c> command </summary>
    public class GetUserTokensHandler
        : IRequestHandler<GetUserTokens, DTO_Connection<DTO_Token>>
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
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_Token> _cursor_provider;

        /// <summary>
        /// Injected <c>IPersistentGrantSerializer</c>
        /// </summary>
        private readonly IPersistentGrantSerializer _grant_serializer;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetUserTokensHandler(
            IPersistedGrantStore grant_store,
            ICurrentUser currentuser,
            ICursorPagination<DTO_Token> cursor_provider,
            IPersistentGrantSerializer grant_serializer
        )
        {
            _grant_store = grant_store;

            _current = currentuser;

            _cursor_provider = cursor_provider;

            _grant_serializer = grant_serializer;
        }

        /// <summary>
        /// Command handler for <c>GetUserTokens</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_Token>> Handle(
            GetUserTokens request,
            CancellationToken cancellationToken
        )
        {
            var subject_id = _current.UserId;

            var grants = await _grant_store
            .GetAllAsync(new PersistedGrantFilter()
            {
                SubjectId = subject_id
            });

            var tokens_query = grants.Where(e =>
                e.ClientId.Equals(
                    "api_client", StringComparison.OrdinalIgnoreCase) &&
                e.Type.Equals(
                    "reference_token", StringComparison.OrdinalIgnoreCase)
            ).Select(e => new DTO_Token()
            {
                Id = e.Key,
                Description = e.Description,
                SubjectId = e.SubjectId,
                Expiration = e.Expiration,
                JsonData = JsonSerializer.Serialize(
                    _grant_serializer.Deserialize<Token>(e.Data)
                )
            }).AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => tokens_query
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                tokens_query,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_Token>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}