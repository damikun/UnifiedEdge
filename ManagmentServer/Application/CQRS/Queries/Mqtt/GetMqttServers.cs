using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Cache;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Servers (from db)
    /// </summary>
    public class GetMqttServers
        : CommandBase<(
            IReadOnlyList<EdgeBase<DTO_MqttServer>> edges,
            PageInfo pageInfo
        )>
    {
        public GetMqttServers(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServers Field Validator
    /// </summary>
    public class GetMqttServersValidator<TEdgeType, TDataType>
        : AbstractValidator<GetMqttServers>
    {
        public GetMqttServersValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServers Field Authorization validator
    /// </summary>
    public class GetMqttServersAuthorizationValidator
        : AuthorizationValidator<GetMqttServers>
    {
        public GetMqttServersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServers</c> command </summary>
    public class GetMqttServersHandler
        : IRequestHandler<GetMqttServers, (IReadOnlyList<EdgeBase<DTO_MqttServer>> edges, PageInfo pageInfo)>
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
        private readonly ICursorPagination<DTO_MqttServer> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttServer> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServers</c>
        /// </summary>
        public async Task<(IReadOnlyList<EdgeBase<DTO_MqttServer>> edges, PageInfo pageInfo)> Handle(
            GetMqttServers request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var queriable = dbContext.Servers
                .AsNoTracking()
                .OfType<Domain.Server.MqttServer>()
                .ProjectTo<DTO_MqttServer>(_mapper.ConfigurationProvider)
                .AsQueryable();

            Func<CancellationToken, Task<int>> total_count;

            if (_cache.TryGetValue<int>(DomainCacheKeys.MqttServersTotalCount, out int cached_total_count))
            {
                total_count = (ct) => Task.FromResult<int>(cached_total_count);
            }
            else
            {
                total_count = (ct) => dbContext.Servers
                .OfType<Domain.Server.MqttServer>()
                .CountAsync(ct);
            }

            return await _cursor_provider.ApplyQueriablePagination(
                queriable,
                request.Arguments,
                (ct) => dbContext.Servers
                .OfType<Domain.Server.MqttServer>()
                .CountAsync(ct),
                cancellationToken
            );

        }
    }
}