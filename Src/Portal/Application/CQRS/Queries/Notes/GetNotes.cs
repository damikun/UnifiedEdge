using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Notes (from db)
    /// </summary>
    [Authorize]
    public class GetNotes
    : CommandBase<DTO_Connection<DTO_Note>>
    {
        public GetNotes(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public bool privateOnly { get; set; }

        public bool publicOnly { get; set; }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetNotes Field Validator
    /// </summary>
    public class GetNotesValidator
        : AbstractValidator<GetNotes>
    {
        public GetNotesValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetNotes Field Authorization validator
    /// </summary>
    public class GetNotesAuthorizationValidator
        : AuthorizationValidator<GetNotes>
    {
        public GetNotesAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetNotes</c> command </summary>
    public class GetNotesHandler
        : IRequestHandler<GetNotes, DTO_Connection<DTO_Note>>
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
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_Note> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetNotesHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_Note> cursor_provider,
            IMemoryCache cache,
            ICurrentUser current
        )
        {
            _cache = cache;

            _mapper = mapper;

            _current = current;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetNotes</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_Note>> Handle(
            GetNotes request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var queriable = dbContext.Notes
            .AsNoTracking();

            if (request.privateOnly)
            {
                queriable = queriable.Where(e =>
                    e.isPrivate && e.CreatedBy == _current.UserId
                ).TagWith("Query private notes");
            }
            else if (request.publicOnly)
            {
                queriable = queriable.Where(e => !e.isPrivate)
                .TagWith("Query public notes");
            }
            else
            {
                queriable = queriable.Where(e =>
                    !e.isPrivate ||
                    (e.isPrivate && e.CreatedBy == _current.UserId)
                )
                .TagWith("Query private and public notes");
            }

            Func<CancellationToken, Task<int>> total_count = (ct) => queriable
                .AsNoTracking()
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                queriable.ProjectTo<DTO_Note>(_mapper.ConfigurationProvider),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_Note>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}