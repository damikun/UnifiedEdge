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
    /// RemoveMqttAuthClient
    /// </summary>
    [Authorize]
    public class RemoveMqttAuthClient
        : CommandBase<DTO_MqttAuthClient>
    {
#nullable disable
        public long AuthClientId;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RemoveMqttAuthClient
    /// </summary>
    public class RemoveMqttAuthClientValidator
        : AbstractValidator<RemoveMqttAuthClient>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveMqttAuthClientValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthClientId)
            .GreaterThan(0);

            RuleFor(e => e.AuthClientId)
                .MustAsync(Exist);
        }

        public async Task<bool> Exist(
            long Id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthClients
                .AnyAsync(e => e.Id == Id);
        }
    }

    /// <summary>
    /// Authorization validators - RemoveMqttAuthClient
    /// </summary>
    public class RemoveMqttAuthClientAuthorizationValidator
        : AuthorizationValidator<RemoveMqttAuthClient>
    {
        public RemoveMqttAuthClientAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveMqttAuthClientHandler</c> command </summary>
    public class RemoveMqttAuthClientHandler
        : IRequestHandler<RemoveMqttAuthClient, DTO_MqttAuthClient>
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
        public RemoveMqttAuthClientHandler(
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
        /// Command handler for <c>RemoveMqttAuthClient</c>
        /// </summary>
        public async Task<DTO_MqttAuthClient> Handle(
            RemoveMqttAuthClient request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var client = await dbContext.MqttAuthClients
            .Where(e => e.Id == request.AuthClientId)
            .FirstAsync(cancellationToken);

            var server = dbContext.Remove(client);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthClient>(client);
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class RemoveMqttAuthClient_PostProcessor
        : IRequestPostProcessor<RemoveMqttAuthClient, DTO_MqttAuthClient>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public RemoveMqttAuthClient_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            RemoveMqttAuthClient request,
            DTO_MqttAuthClient response,
            CancellationToken cancellationToken
        )
        {

        }
    }
}