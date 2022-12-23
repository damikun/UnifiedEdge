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
    /// Query Mqtt Server Explorer User scoped Saved Subscriptions
    /// </summary>
    public class RemoveMqttServerExplorerUserScopedSubs
        : CommandBase<DTO_MqttExplorerSub>
    {
        public long StoredSubId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// RemoveMqttServerExplorerUserScopedSubs Field Validator
    /// </summary>
    public class RemoveMqttServerExplorerUserScopedSubsValidator
        : AbstractValidator<RemoveMqttServerExplorerUserScopedSubs>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveMqttServerExplorerUserScopedSubsValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.StoredSubId)
                .MustAsync(StoredSubExist)
                .WithMessage("MqttServer not found");
        }

        public async Task<bool> StoredSubExist(
            long StoredSubId,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttExplorerSubs
            .AnyAsync(e => e.Id == StoredSubId);
        }
    }

    /// <summary>
    /// RemoveMqttServerExplorerUserScopedSubs Field Authorization validator
    /// </summary>
    public class RemoveMqttServerExplorerUserScopedSubsAuthorizationValidator
        : AuthorizationValidator<RemoveMqttServerExplorerUserScopedSubs>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public RemoveMqttServerExplorerUserScopedSubsAuthorizationValidator(
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

        public bool ExistValidUserSubId(RemoveMqttServerExplorerUserScopedSubs command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }

        public async Task<bool> SubjectIdPairedWithSubscription(
            RemoveMqttServerExplorerUserScopedSubs command,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttExplorerSubs
            .AnyAsync(e =>
                e.Id == command.StoredSubId &&
                e.UserUid == _current_user.UserId
            );
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveMqttServerExplorerUserScopedSubs</c> command </summary>
    public class RemoveMqttServerExplorerUserScopedSubsHandler
        : IRequestHandler<RemoveMqttServerExplorerUserScopedSubs, DTO_MqttExplorerSub>
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
        public RemoveMqttServerExplorerUserScopedSubsHandler(
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
        /// Command handler for <c>RemoveMqttServerExplorerUserScopedSubs</c>
        /// </summary>
        public async Task<DTO_MqttExplorerSub> Handle(
            RemoveMqttServerExplorerUserScopedSubs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var enity = await dbContext.MqttExplorerSubs
            .Where(e => e.Id == request.StoredSubId)
            .FirstAsync(cancellationToken);

            dbContext.MqttExplorerSubs.Remove(enity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttExplorerSub>(enity);
        }
    }
}