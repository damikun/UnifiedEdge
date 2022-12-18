using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// RemoveMqttAuthUser
    /// </summary>
    [Authorize]
    public class RemoveMqttAuthUser
        : CommandBase<DTO_MqttAuthUser>
    {
#nullable disable
        public long AuthUserId;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RemoveMqttAuthUser
    /// </summary>
    public class RemoveMqttAuthUserValidator
        : AbstractValidator<RemoveMqttAuthUser>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveMqttAuthUserValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthUserId)
                .GreaterThan(0);

            RuleFor(e => e.AuthUserId)
                .MustAsync(Exist);

            RuleFor(e => e.AuthUserId)
                .MustAsync(IsDeletable)
                .WithMessage("System user cannot be deleted");
        }

        public async Task<bool> Exist(
            long Id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
                .AnyAsync(e => e.Id == Id);
        }

        public async Task<bool> IsDeletable(
            long Id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
                .Where(e => e.Id == Id)
                .AnyAsync(e => e.System == false, cancellationToken);
        }
    }

    /// <summary>
    /// Authorization validators - RemoveMqttAuthUser
    /// </summary>
    public class RemoveMqttAuthUserAuthorizationValidator
        : AuthorizationValidator<RemoveMqttAuthUser>
    {
        public RemoveMqttAuthUserAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveMqttAuthUserHandler</c> command </summary>
    public class RemoveMqttAuthUserHandler
        : IRequestHandler<RemoveMqttAuthUser, DTO_MqttAuthUser>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public RemoveMqttAuthUserHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;
        }

        /// <summary>
        /// Command handler for <c>RemoveMqttAuthUser</c>
        /// </summary>
        public async Task<DTO_MqttAuthUser> Handle(
            RemoveMqttAuthUser request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var user = await dbContext.MqttAuthUsers
            .Where(e => e.Id == request.AuthUserId)
            .FirstAsync(cancellationToken);

            var server = dbContext.Remove(user);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthUser>(user);
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class RemoveMqttAuthUser_PostProcessor
        : IRequestPostProcessor<RemoveMqttAuthUser, DTO_MqttAuthUser>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public RemoveMqttAuthUser_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            RemoveMqttAuthUser request,
            DTO_MqttAuthUser response,
            CancellationToken cancellationToken
        )
        {

        }
    }
}