using MediatR;
using AutoMapper;
using Domain.Server;
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
    /// AddMqttAuthRule
    /// </summary>
    [Authorize]
    public class AddMqttAuthRule
        : CommandBase<DTO_MqttAuthRule>
    {

        public long AuthClientId;

        public string? Topic { get; set; }

#nullable disable
        public AuthAction AuthAction { get; set; }

        public MqttAction MqttAction { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - AddMqttAuthRule
    /// </summary>
    public class AddMqttAuthRuleValidator
        : AbstractValidator<AddMqttAuthRule>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public AddMqttAuthRuleValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthClientId)
                .NotEmpty()
                .NotNull()
                .MustAsync(Exist)
                .WithMessage("Auth client not found");
        }

        public async Task<bool> Exist(
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthClients
                .AnyAsync(e => e.Id == id);
        }
    }

    /// <summary>
    /// Authorization validators - AddMqttAuthRule
    /// </summary>
    public class AddMqttAuthRuleAuthorizationValidator
        : AuthorizationValidator<AddMqttAuthRule>
    {
        public AddMqttAuthRuleAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>AddMqttAuthRuleHandler</c> command </summary>
    public class AddMqttAuthRuleHandler
        : IRequestHandler<AddMqttAuthRule, DTO_MqttAuthRule>
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
        /// Injected <c>IPasswordHasher</c>
        /// </summary>
        private readonly IPasswordHasher _hasher;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public AddMqttAuthRuleHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IPasswordHasher hasher
        )
        {
            _hasher = hasher;

            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;
        }

        /// <summary>
        /// Command handler for <c>AddMqttAuthRule</c>
        /// </summary>
        public async Task<DTO_MqttAuthRule> Handle(
            AddMqttAuthRule request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var authClient = await dbContext.MqttAuthClients
            .Where(e => e.Id == request.AuthClientId)
            .Include(e => e.Rules)
            .FirstAsync(cancellationToken);

            var rule = new MqttAuthRule()
            {
                AuthAction = request.AuthAction,
                MqttAction = request.MqttAction,
                Topic = request.Topic
            };

            authClient.Rules.Add(rule);

            dbContext.MqttAuthClients.Update(authClient);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthRule>(rule);

        }
    }

    //---------------------------------------
    //---------------------------------------


    public class AddMqttAuthRule_PostProcessor
        : IRequestPostProcessor<AddMqttAuthRule, DTO_MqttAuthRule>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public AddMqttAuthRule_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            AddMqttAuthRule request,
            DTO_MqttAuthRule response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}