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
    /// EnableMqttAuthUser
    /// </summary>
    [Authorize]
    public class EnableMqttAuthUser
        : CommandBase<DTO_MqttAuthClient>
    {

        public long AuthUserId;

        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableMqttAuthUser
    /// </summary>
    public class EnableMqttAuthUserValidator
        : AbstractValidator<EnableMqttAuthUser>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableMqttAuthUserValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthUserId)
                .GreaterThan(0)
                .MustAsync(Exist)
                .WithMessage("Auth user not found");
        }

        public async Task<bool> Exist(
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
                .AnyAsync(e => e.Id == id);
        }
    }

    /// <summary>
    /// Authorization validators - EnableMqttAuthUser
    /// </summary>
    public class EnableMqttAuthUserAuthorizationValidator
        : AuthorizationValidator<EnableMqttAuthUser>
    {
        public EnableMqttAuthUserAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableMqttAuthUserHandler</c> command </summary>
    public class EnableMqttAuthUserHandler
        : IRequestHandler<EnableMqttAuthUser, DTO_MqttAuthClient>
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
        public EnableMqttAuthUserHandler(
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
        /// Command handler for <c>EnableMqttAuthUser</c>
        /// </summary>
        public async Task<DTO_MqttAuthClient> Handle(
            EnableMqttAuthUser request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var authUser = await dbContext.MqttAuthUsers
            .Where(e => e.Id == request.AuthUserId)
            .FirstAsync(cancellationToken);

            authUser.Enabled = true;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthClient>(authUser);

        }
    }

    //---------------------------------------
    //---------------------------------------


    public class EnableMqttAuthUser_PostProcessor
        : IRequestPostProcessor<EnableMqttAuthUser, DTO_MqttAuthClient>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableMqttAuthUser_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableMqttAuthUser request,
            DTO_MqttAuthClient response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}