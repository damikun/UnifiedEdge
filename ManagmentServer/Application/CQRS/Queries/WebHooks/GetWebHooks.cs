using MediatR;
using AutoMapper;
using Persistence.Portal;
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
    /// Query webhooks
    /// </summary>
    public class GetWebHooks
        : CommandBase<DTO_Connection<DTO_WebHook>>
    {
        public GetWebHooks(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetWebHooks Validator
    /// </summary>
    public class GetWebHooksValidator
        : AbstractValidator<GetWebHooks>
    {
        public GetWebHooksValidator() { }
    }

    /// <summary>
    /// Authorization validator
    /// </summary>
    public class GetWebHooksAuthorizationValidator
        : AuthorizationValidator<GetWebHooks>
    {
        public GetWebHooksAuthorizationValidator() { }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetWebHooks</c> command </summary>
    public class GetWebHooksHandler
        : IRequestHandler<GetWebHooks, DTO_Connection<DTO_WebHook>>
    {
        /// <summary>
        /// WebHook Queriable helper
        /// </summary>
        private readonly ICursorPagination<DTO_WebHook> _pagination;

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
        public GetWebHooksHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_WebHook> pagination)
        {
            _mapper = mapper;

            _factory = factory;

            _pagination = pagination;
        }

        /// <summary>
        /// Command handler for <c>GetWebHooks</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_WebHook>> Handle(
            GetWebHooks request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.WebHooks
            .AsNoTracking()
            .ProjectTo<DTO_WebHook>(_mapper.ConfigurationProvider)
            .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => query
                .CountAsync(ct);

            var cursor_data = await _pagination.ApplyQueriablePagination(
                query,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_WebHook>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}