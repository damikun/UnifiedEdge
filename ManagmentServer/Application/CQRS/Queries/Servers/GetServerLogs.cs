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
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Server logs (from db)
    /// </summary>
    public class GetServerLogs
     : CommandBase<DTO_Connection<DTO_IServerEventLog>>
    {
        public string Uid { get; init; }

        public GetServerLogs(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            Uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetServerLogs Field Validator
    /// </summary>
    public class GetServerLogsValidator
        : AbstractValidator<GetServerLogs>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetServerLogsValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Uid)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("Server uid not found");
        }

        public async Task<bool> Exist(
            string uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == uid, cancellationToken);
        }
    }

    /// <summary>
    /// GetServerLogs Field Authorization validator
    /// </summary>
    public class GetServerLogsAuthorizationValidator
        : AuthorizationValidator<GetServerLogs>
    {
        public GetServerLogsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetServerLogs</c> command </summary>
    public class GetServerLogsHandler
        : IRequestHandler<GetServerLogs, DTO_Connection<DTO_IServerEventLog>>
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
        private readonly ICursorPagination<Domain.Server.Events.ServerEventBase> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetServerLogsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<Domain.Server.Events.ServerEventBase> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetServerLogs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_IServerEventLog>> Handle(
            GetServerLogs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var events_queriable = dbContext.ServerEvents
                .AsNoTracking()
                .Where(e => e.ServerUid == request.Uid)
                .OrderByDescending(e => e.TimeStamp)
                .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => dbContext.ServerEvents
                .AsNoTracking()
                .Where(e => e.ServerUid == request.Uid)
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                events_queriable,
                request.Arguments,
                total_count,
                cancellationToken
            );

            var map_dto_edges = _mapper.Map<List<EdgeBase<DTO_IServerEventLog>>>(cursor_data.edges);

            return new DTO_Connection<DTO_IServerEventLog>()
            {
                edges = map_dto_edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}