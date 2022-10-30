using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Aplication.Core.Pagination;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query webhook records
    /// </summary>
    public class GetWebHookRecords
        : CommandBase<DTO_Connection<DTO_WebHookRecord>>
    {
        public GetWebHookRecords(
            CursorArguments arguments,
            long hook_id
        )
        {
            Hook_id = hook_id;
            Arguments = arguments;
        }

        public long Hook_id { get; set; }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetWebHookRecords Validator
    /// </summary>
    public class GetWebHookRecordsValidator
        : AbstractValidator<GetWebHookRecords>
    {
        public GetWebHookRecordsValidator()
        {
            RuleFor(e => e.Hook_id)
            .GreaterThan(0);
        }
    }

    /// <summary>
    /// Authorization validator
    /// </summary>
    public class GetWebHookRecordsAuthorizationValidator
        : AuthorizationValidator<GetWebHookRecords>
    {
        public GetWebHookRecordsAuthorizationValidator() { }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetWebHookRecords</c> command </summary>
    public class GetWebHookRecordsHandler
        : IRequestHandler<GetWebHookRecords, DTO_Connection<DTO_WebHookRecord>>
    {
        /// <summary>
        /// WebHook Queriable helper
        /// </summary>
        private readonly ICursorPagination<DTO_WebHookRecord> _pagination;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetWebHookRecordsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_WebHookRecord> pagination)
        {
            _mapper = mapper;

            _factory = factory;

            _pagination = pagination;
        }

        /// <summary>
        /// Command handler for <c>GetWebHookRecords</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_WebHookRecord>> Handle(
            GetWebHookRecords request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.WebHooksHistory
            .AsNoTracking()
            .Where(e => e.WebHookID == request.Hook_id)
            .ProjectTo<DTO_WebHookRecord>(_mapper.ConfigurationProvider)
            .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => query
                .CountAsync(ct);

            query.OrderByDescending(e => e.Timestamp);

            var cursor_data = await _pagination.ApplyQueriablePagination(
                query,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_WebHookRecord>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}