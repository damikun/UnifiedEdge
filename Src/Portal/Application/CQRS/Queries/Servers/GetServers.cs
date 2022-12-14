using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Servers (from db)
    /// </summary>
    public class GetServers
        : CommandBase<DTO_Connection<IServer>>
    {
        public GetServers(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetServers Field Validator
    /// </summary>
    public class GetServersValidator
        : AbstractValidator<GetServers>
    {
        public GetServersValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetServers Field Authorization validator
    /// </summary>
    public class GetServersAuthorizationValidator
        : AuthorizationValidator<GetServers>
    {
        public GetServersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetServers</c> command </summary>
    public class GetServersHandler
        : IRequestHandler<GetServers, DTO_Connection<IServer>>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

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
        private readonly ICursorPagination<IServer> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetServersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<IServer> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetServers</c>
        /// </summary>
        public async Task<DTO_Connection<IServer>> Handle(
            GetServers request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            // Yes we query all together and than convert to queribale..
            var servers = await dbContext.Servers
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var mapped = _mapper.Map<List<IServer>>(servers);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                mapped.AsQueryable(),
                request.Arguments,
                (ct) => Task.FromResult(mapped.Count),
                cancellationToken
            );

            return new DTO_Connection<IServer>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}