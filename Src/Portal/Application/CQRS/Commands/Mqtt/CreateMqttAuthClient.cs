using MediatR;
using AutoMapper;
using Domain.Server;
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
    /// CreateMqttAuthClient
    /// </summary>
    [Authorize]
    public class CreateMqttAuthClient
        : CommandBase<DTO_MqttAuthClient>
    {
#nullable disable
        public string Server_uid;

        public string ClientId;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateMqttAuthClient
    /// </summary>
    public class CreateMqttAuthClientValidator
        : AbstractValidator<CreateMqttAuthClient>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateMqttAuthClientValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(ServerExist)
                .WithMessage("Server not found");

            RuleFor(e => e.ClientId)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);

            RuleFor(e => e)
                .MustAsync(IsUniqueIdForServerId)
                .WithMessage("Client allready defined");
        }

        public async Task<bool> ServerExist(
            string Uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Uid);
        }

        public async Task<bool> IsUniqueIdForServerId(
            CreateMqttAuthClient request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            if (string.IsNullOrWhiteSpace(request.ClientId))
            {
                return false;
            }

            var normalised_clientId = request.ClientId
                .ToLowerInvariant();

            return !await dbContext.MqttAuthClients
                .Where(
                    e => e.Server != null &&
                    e.Server.UID == request.Server_uid
                )
                .AnyAsync(
                    e => e.ClientId == normalised_clientId,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// Authorization validators - CreateMqttAuthClient
    /// </summary>
    public class CreateMqttAuthClientAuthorizationValidator
        : AuthorizationValidator<CreateMqttAuthClient>
    {
        public CreateMqttAuthClientAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateMqttAuthClientHandler</c> command </summary>
    public class CreateMqttAuthClientHandler
        : IRequestHandler<CreateMqttAuthClient, DTO_MqttAuthClient>
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
        public CreateMqttAuthClientHandler(
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
        /// Command handler for <c>CreateMqttAuthClient</c>
        /// </summary>
        public async Task<DTO_MqttAuthClient> Handle(
            CreateMqttAuthClient request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server_id = await dbContext.Servers
            .Where(e => e.UID == request.Server_uid)
            .Select(e => e.ID)
            .FirstOrDefaultAsync(cancellationToken);

            if (server_id == default)
            {
                throw new Exception("Failed to faind specific server");
            }

            var normalised_clientId = request.ClientId
                .ToLowerInvariant();

            var client = new MqttAuthClient()
            {
                ClientId = request.ClientId.ToLowerInvariant(),
                ServerId = server_id,
                Enabled = true,
            };

            var server = dbContext
            .MqttAuthClients
            .Add(client);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthClient>(client);
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class CreateMqttAuthClient_PostProcessor
        : IRequestPostProcessor<CreateMqttAuthClient, DTO_MqttAuthClient>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateMqttAuthClient_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateMqttAuthClient request,
            DTO_MqttAuthClient response,
            CancellationToken cancellationToken
        )
        {
            // await _publisher.Publish<MqttServerAuthClientAdded>(
            //     new MqttServerAuthClientAdded(response),
            //     Services.PublishStrategy.ParallelNoWait
            // );
        }
    }

}