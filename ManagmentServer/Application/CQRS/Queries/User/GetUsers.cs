using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Identity;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Users (from db)
    /// </summary>
    public class GetUsers
        : CommandBase<DTO_Connection<DTO_User>>
    {
        public GetUsers(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUsers Field Validator
    /// </summary>
    public class GetUsersValidator
        : AbstractValidator<GetUsers>
    {
        public GetUsersValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetUsers Field Authorization validator
    /// </summary>
    public class GetUsersAuthorizationValidator
        : AuthorizationValidator<GetUsers>
    {
        public GetUsersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUsers</c> command </summary>
    public class GetUsersHandler
        : IRequestHandler<GetUsers, DTO_Connection<DTO_User>>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<PortalIdentityDbContextPooled></c>
        /// </summary>
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMemoryCache _cache;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_User> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetUsersHandler(
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
            IMapper mapper,
            ICursorPagination<DTO_User> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetUsers</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_User>> Handle(
            GetUsers request,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            // Yes we query all together and than convert to queribale..
            var queriable = dbContext.Users
                .AsNoTracking()
                .ProjectTo<DTO_User>(_mapper.ConfigurationProvider)
                .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => dbContext.Users
                .AsNoTracking()
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                queriable,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_User>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}