using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{
    /// <summary>
    /// Query System logs (from db)
    /// </summary>
    public class GetSystemLogs
     : CommandBase<DTO_Connection<DTO_SystemEvent>>
    {
        public GetSystemLogs(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetSystemLogs Field Validator
    /// </summary>
    public class GetSystemLogsValidator
        : AbstractValidator<GetSystemLogs>
    {
        public GetSystemLogsValidator()
        {

        }
    }

    /// <summary>
    /// GetSystemLogs Field Authorization validator
    /// </summary>
    public class GetSystemLogsAuthorizationValidator
        : AuthorizationValidator<GetSystemLogs>
    {
        public GetSystemLogsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetSystemLogs</c> command </summary>
    public class GetSystemLogsHandler
        : IRequestHandler<GetSystemLogs, DTO_Connection<DTO_SystemEvent>>
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
        /// Injected <c>IMemoryCache</c>
        /// </summary>
        private readonly IMemoryCache _cache;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_SystemEvent> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetSystemLogsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_SystemEvent> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetSystemLogs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_SystemEvent>> Handle(
            GetSystemLogs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var events_queriable = dbContext.SystemEvents
                .AsNoTracking()
                .ProjectTo<DTO_SystemEvent>(_mapper.ConfigurationProvider)
                .OrderByDescending(e => e.TimeStamp)
                .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => dbContext.SystemEvents
                .AsNoTracking()
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                events_queriable,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_SystemEvent>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}