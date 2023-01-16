using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Remove stored message template
    /// </summary>
    [Authorize]
    public class RemoveMqttExplorerMessageTemplate
        : CommandBase<DTO_MqttMessageTemplate>
    {
        public long TemplateId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// RemoveMqttExplorerMessageTemplate Field Validator
    /// </summary>
    public class RemoveMqttExplorerMessageTemplateValidator
        : AbstractValidator<RemoveMqttExplorerMessageTemplate>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveMqttExplorerMessageTemplateValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.TemplateId)
                .MustAsync(StoredSubExist)
                .WithMessage("Templeate not found");
        }

        public async Task<bool> StoredSubExist(
            long StoredId,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttMessageTemplates
            .AnyAsync(e => e.Id == StoredId);
        }
    }

    /// <summary>
    /// RemoveMqttExplorerMessageTemplate Field Authorization validator
    /// </summary>
    public class RemoveMqttExplorerMessageTemplateAuthorizationValidator
        : AuthorizationValidator<RemoveMqttExplorerMessageTemplate>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public RemoveMqttExplorerMessageTemplateAuthorizationValidator(
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
            .MustAsync(SubjectIdPairedWithSubscription)
            .WithMessage("You are not resource owner");
        }

        public bool ExistValidUserSubId(RemoveMqttExplorerMessageTemplate command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }

        public async Task<bool> SubjectIdPairedWithSubscription(
            RemoveMqttExplorerMessageTemplate command,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttMessageTemplates
            .AnyAsync(e =>
                e.Id == command.TemplateId &&
                e.UserUid == _current_user.UserId
            );
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveMqttExplorerMessageTemplate</c> command </summary>
    public class RemoveMqttExplorerMessageTemplateHandler
        : IRequestHandler<RemoveMqttExplorerMessageTemplate, DTO_MqttMessageTemplate>
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
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Main constructor
        /// </summary>
        public RemoveMqttExplorerMessageTemplateHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICurrentUser current_user
        )
        {
            _mapper = mapper;

            _factory = factory;

            _current_user = current_user;
        }

        /// <summary>
        /// Command handler for <c>RemoveMqttExplorerMessageTemplate</c>
        /// </summary>
        public async Task<DTO_MqttMessageTemplate> Handle(
            RemoveMqttExplorerMessageTemplate request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var enity = await dbContext.MqttMessageTemplates
            .Where(e => e.Id == request.TemplateId)
            .FirstAsync(cancellationToken);

            dbContext.MqttMessageTemplates
            .Remove(enity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttMessageTemplate>(enity);
        }
    }
}