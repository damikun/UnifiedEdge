using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// HighlightNote
    /// </summary>
    [Authorize(Policy = "authenticated_user")]
    public class HighlightNote : CommandBase<DTO_Note>
    {
        public long NoteId { get; set; }

        public bool Highlighted { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - HighlightNote
    /// </summary>
    public class HighlightNoteValidator : AbstractValidator<HighlightNote>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public HighlightNoteValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.NoteId)
                .MustAsync(Exist);
        }

        public async Task<bool> Exist(
            long Id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Notes
                .AnyAsync(e => e.Id == Id);
        }
    }

    /// <summary>
    /// Authorization validators - HighlightNote
    /// </summary>
    public class HighlightNoteAuthorizationValidator
        : AuthorizationValidator<HighlightNote>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public HighlightNoteAuthorizationValidator(
            ICurrentUser current_user,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            _current_user = current_user;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e)
            .Must(ExistValidUserSubId)
            .WithMessage("Missing user profile data");

            RuleFor(e => e)
            .MustAsync(SubjectIdPairedWithNote)
            .WithMessage("You are not resource owner");
        }

        public bool ExistValidUserSubId(HighlightNote command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }

        public async Task<bool> SubjectIdPairedWithNote(
            HighlightNote command,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Notes
            .Where(e => e.Id == command.NoteId)
            .AnyAsync(e =>
                (e.isPrivate == false) ||
                (
                e.CreatedBy == _current_user.UserId
                )
            );
        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>HighlightNoteHandler</c> command </summary>
    public class HighlightNoteHandler : IRequestHandler<HighlightNote, DTO_Note>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public HighlightNoteHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICurrentUser current
        )
        {
            _factory = factory;

            _current = current;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>HighlightNote</c>
        /// </summary>
        public async Task<DTO_Note> Handle(
            HighlightNote request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var note = await dbContext.Notes.Where(e => e.Id == request.NoteId)
            .FirstAsync(cancellationToken);

            note.isHighlighted = request.Highlighted;

            note.Updatedby = _current.UserId;

            note.Updated = DateTime.Now;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_Note>(note);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class HighlightNote_PostProcessor
        : IRequestPostProcessor<HighlightNote, DTO_Note>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public HighlightNote_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            HighlightNote request,
            DTO_Note response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {

            }
        }
    }

}