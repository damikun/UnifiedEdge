using MediatR;
using AutoMapper;
using Persistence;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Servers (from db)
    /// </summary>
    public class GetServers
        : CommandBase<(
            IReadOnlyList<EdgeBase<IServer>> edges,
            PageInfo pageInfo
        )>
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
    public class GetServersValidator<TEdgeType, TDataType>
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
        : IRequestHandler<GetServers, (IReadOnlyList<EdgeBase<IServer>> edges, PageInfo pageInfo)>
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
        public async Task<(IReadOnlyList<EdgeBase<IServer>> edges, PageInfo pageInfo)> Handle(
            GetServers request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var mqtt = await dbContext.Servers
                .AsNoTracking()
                .ToListAsync();

            var mapped = _mapper.Map<List<IServer>>(mqtt);

            return await _cursor_provider.ApplyQueriablePagination(
                mapped.AsQueryable(),
                request.Arguments,
                (ct) => Task.FromResult(mapped.Count),
                cancellationToken
            );
        }
    }
}