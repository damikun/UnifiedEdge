using Domain;
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
    /// CreateNote
    /// </summary>
    [Authorize(Policy = "authenticated_user")]
    public class CreateNote : CommandBase<DTO_Note>
    {
#nullable disable
        public string Data;

        public string Name;
#nullable enable

        public bool IsPrivate { get; set; } = false;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateNote
    /// </summary>
    public class CreateNoteValidator : AbstractValidator<CreateNote>
    {
        public CreateNoteValidator()
        {
            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.Data)
            .NotEmpty()
            .NotNull();
        }
    }

    /// <summary>
    /// Authorization validators - CreateNote
    /// </summary>
    public class CreateNoteAuthorizationValidator
        : AuthorizationValidator<CreateNote>
    {
        private readonly ICurrentUser _current_user;

        public CreateNoteAuthorizationValidator(
            ICurrentUser current_user
        )
        {
            _current_user = current_user;

            RuleFor(e => e)
            .Must(ExistValidUserSubId)
            .WithMessage("Missing user profile data");
        }

        public bool ExistValidUserSubId(CreateNote command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateNoteHandler</c> command </summary>
    public class CreateNoteHandler : IRequestHandler<CreateNote, DTO_Note>
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
        public CreateNoteHandler(
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
        /// Command handler for <c>CreateNote</c>
        /// </summary>
        public async Task<DTO_Note> Handle(
            CreateNote request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var timestamp = DateTime.Now;

            var note = new Note()
            {
                Name = request.Name,
                Content = request.Data,
                Created = timestamp,
                Updated = timestamp,
                isDraft = false,
                isPrivate = request.IsPrivate,
                CreatedBy = _current.UserId,
                Updatedby = _current.UserId
            };

            dbContext.Notes.Add(note);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_Note>(note);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class CreateNote_PostProcessor
        : IRequestPostProcessor<CreateNote, DTO_Note>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateNote_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateNote request,
            DTO_Note response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {

            }
        }
    }

}