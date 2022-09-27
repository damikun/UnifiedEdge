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
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query concrete adapter logs
    /// </summary>
    public class GetAdapterLogs
        : CommandBase<DTO_Connection<DTO_AdapterLog>>
    {
#nullable disable
        public string AdapterId { get; set; }
#nullable enable

        public GetAdapterLogs(CursorArguments arguments, string adapter_id)
        {
            Arguments = arguments;
            AdapterId = adapter_id;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetAdapterLogs Field Validator
    /// </summary>
    public class GetAdapterLogsValidator
        : AbstractValidator<GetAdapterLogs>
    {
        private readonly IEndpointProvider _provider;
        public GetAdapterLogsValidator(IEndpointProvider provider)
        {
            _provider = provider;

            RuleFor(e => e.AdapterId)
            .NotNull()
            .NotEmpty()
            .Must(Exist).WithMessage("Adapter not found");
        }

        public bool Exist(string AdapterId)
        {
            return _provider.Any(AdapterId);
        }
    }

    /// <summary>
    /// GetAdapterLogs Field Authorization validator
    /// </summary>
    public class GetAdapterLogsAuthorizationValidator
        : AuthorizationValidator<GetAdapterLogs>
    {
        public GetAdapterLogsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetAdapterLogs</c> command </summary>
    public class GetAdapterLogsHandler
        : IRequestHandler<GetAdapterLogs, DTO_Connection<DTO_AdapterLog>>
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
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_AdapterLog> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetAdapterLogsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IEndpointProvider endpoint,
            IMapper mapper,
            ICursorPagination<DTO_AdapterLog> cursor_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _endpoint = endpoint;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetAdapterLogs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_AdapterLog>> Handle(
            GetAdapterLogs request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var queriable = dbContext.AdapterEvents
                .AsNoTracking()
                .Where(e => e.AdapterId == request.AdapterId)
                .ProjectTo<DTO_AdapterLog>(_mapper.ConfigurationProvider)
                .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => dbContext.AdapterEvents
                .AsNoTracking()
                .Where(e => e.AdapterId == request.AdapterId)
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                queriable,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_AdapterLog>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}