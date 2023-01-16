using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server Note by ID
    /// </summary>
    [Authorize]
    public class GetNoteById
        : CommandBase<DTO_Note>
    {

#nullable disable
        public long Note_id { get; set; }
#nullable enable

        public GetNoteById(long id)
        {
            Note_id = id;
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetNoteById Field Validator
    /// </summary>
    public class GetNoteByIdValidator
        : AbstractValidator<GetNoteById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetNoteByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Note_id)
            .GreaterThan(0)
            .MustAsync(Exist)
            .WithMessage("Note not found");
        }

        public async Task<bool> Exist(
            long note_id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Notes
                .AnyAsync(
                    e => e.Id == note_id,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// GetNoteById Field Authorization validator
    /// </summary>
    public class GetNoteByIdAuthorizationValidator
        : AuthorizationValidator<GetNoteById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        public GetNoteByIdAuthorizationValidator(
            ICurrentUser current,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _current = current;
            _factory = factory;

            RuleFor(e => e.Note_id)
            .MustAsync(CanView)
            .WithMessage("Not resource owner");
        }

        public async Task<bool> CanView(
            long note_id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Notes
            .Where(e => e.Id == note_id)
            .AnyAsync(e =>
                e.isPrivate == false ||
                (e.isPrivate && e.CreatedBy == _current.UserId),
                cancellationToken
            );
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetNoteById</c> command </summary>
    public class GetNoteByIdHandler
        : IRequestHandler<GetNoteById, DTO_Note>
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
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_Note> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetNoteByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_Note> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetNoteById</c>
        /// </summary>
        public async Task<DTO_Note> Handle(
            GetNoteById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Notes
            .AsNoTracking()
            .Where(e =>
                e.Id == request.Note_id
            )
            .ProjectTo<DTO_Note>(
                _mapper.ConfigurationProvider
            )
            .FirstAsync(cancellationToken);
        }
    }
}