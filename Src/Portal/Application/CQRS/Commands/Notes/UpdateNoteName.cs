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
    /// UpdateNoteName
    /// </summary>
    [Authorize(Policy = "authenticated_user")]
    public class UpdateNoteName : CommandBase<DTO_Note>
    {
        public long NoteId { get; set; }

#nullable disable
        public string Name { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateNoteName
    /// </summary>
    public class UpdateNoteNameValidator : AbstractValidator<UpdateNoteName>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public UpdateNoteNameValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.NoteId)
                .MustAsync(Exist);

            RuleFor(e => e.Name)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);
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
    /// Authorization validators - UpdateNoteName
    /// </summary>
    public class UpdateNoteNameAuthorizationValidator
        : AuthorizationValidator<UpdateNoteName>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateNoteNameAuthorizationValidator(
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

        public bool ExistValidUserSubId(UpdateNoteName command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }

        public async Task<bool> SubjectIdPairedWithNote(
            UpdateNoteName command,
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

    /// <summary>Handler for <c>UpdateNoteNameHandler</c> command </summary>
    public class UpdateNoteNameHandler : IRequestHandler<UpdateNoteName, DTO_Note>
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
        public UpdateNoteNameHandler(
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
        /// Command handler for <c>UpdateNoteName</c>
        /// </summary>
        public async Task<DTO_Note> Handle(
            UpdateNoteName request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var note = await dbContext.Notes.Where(e => e.Id == request.NoteId)
            .FirstAsync(cancellationToken);

            note.Name = request.Name;

            note.Updatedby = _current.UserId;

            note.Updated = DateTime.Now;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_Note>(note);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class UpdateNoteName_PostProcessor
        : IRequestPostProcessor<UpdateNoteName, DTO_Note>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateNoteName_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateNoteName request,
            DTO_Note response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {

            }
        }
    }

}