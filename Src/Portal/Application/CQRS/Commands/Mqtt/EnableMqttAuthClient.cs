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
    /// EnableMqttAuthClient
    /// </summary>
    [Authorize]
    public class EnableMqttAuthClient
        : CommandBase<DTO_MqttAuthClient>
    {

        public long AuthClientId;

        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableMqttAuthClient
    /// </summary>
    public class EnableMqttAuthClientValidator
        : AbstractValidator<EnableMqttAuthClient>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableMqttAuthClientValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthClientId)
                .GreaterThan(0)
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
    /// Authorization validators - EnableMqttAuthClient
    /// </summary>
    public class EnableMqttAuthClientAuthorizationValidator
        : AuthorizationValidator<EnableMqttAuthClient>
    {
        public EnableMqttAuthClientAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableMqttAuthClientHandler</c> command </summary>
    public class EnableMqttAuthClientHandler
        : IRequestHandler<EnableMqttAuthClient, DTO_MqttAuthClient>
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
        public EnableMqttAuthClientHandler(
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
        /// Command handler for <c>EnableMqttAuthClient</c>
        /// </summary>
        public async Task<DTO_MqttAuthClient> Handle(
            EnableMqttAuthClient request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var authClient = await dbContext.MqttAuthClients
            .Where(e => e.Id == request.AuthClientId)
            .FirstAsync(cancellationToken);

            authClient.Enabled = request.Enable;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthClient>(authClient);

        }
    }

    //---------------------------------------
    //---------------------------------------


    public class EnableMqttAuthClient_PostProcessor
        : IRequestPostProcessor<EnableMqttAuthClient, DTO_MqttAuthClient>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableMqttAuthClient_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableMqttAuthClient request,
            DTO_MqttAuthClient response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}