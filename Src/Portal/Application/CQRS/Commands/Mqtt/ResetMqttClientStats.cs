using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Server.Manager.Mqtt;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// ResetMqttClientStats
    /// </summary>
    [Authorize]
    public class ResetMqttClientStats
        : CommandBase<DTO_MqttClientStatistics>
    {
#nullable disable
        public string Server_uid;

        public string Client_uid;

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - ResetMqttClientStats
    /// </summary>
    public class ResetMqttClientStatsValidator
        : AbstractValidator<ResetMqttClientStats>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IMqttServerManager _manager;

        public ResetMqttClientStatsValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMqttServerManager manager
        )
        {
            _factory = factory;

            _manager = manager;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(ExistServer)
                .WithMessage("Server not found");

            RuleFor(e => e.Client_uid)
                .NotEmpty()
                .NotNull();

            RuleFor(e => e)
                .MustAsync(ExistClient)
                .WithMessage("Client not found");
        }

        public async Task<bool> ExistServer(
             string Uid,
             CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Uid);
        }

        public async Task<bool> ExistClient(
             ResetMqttClientStats command,
             CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(command.Server_uid))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(command.Client_uid))
            {
                return false;
            }

            return await _manager
            .ContainsClient(
                command.Server_uid,
                command.Client_uid
            );
        }
    }

    /// <summary>
    /// Authorization validators - ResetMqttClientStats
    /// </summary>
    public class ResetMqttClientStatsAuthorizationValidator
        : AuthorizationValidator<ResetMqttClientStats>
    {
        public ResetMqttClientStatsAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>ResetMqttClientStatsHandler</c> command </summary>
    public class ResetMqttClientStatsHandler
        : IRequestHandler<ResetMqttClientStats, DTO_MqttClientStatistics>
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
        /// Injected <c>IMqttServerManager</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public ResetMqttClientStatsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider,
            IMqttServerManager manager
        )
        {
            _manager = manager;

            _mapper = mapper;

            _factory = factory;

            _mediator = mediator;
        }

        /// <summary>
        /// Command handler for <c>ResetMqttClientStats</c>
        /// </summary>
        public async Task<DTO_MqttClientStatistics?> Handle(
            ResetMqttClientStats request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.Server_uid)
                .Include(e => e.Endpoints)
                .Include(e => e.Cfg)
                .FirstAsync(cancellationToken);

            if (server == null)
            {
                throw new Exception("Server was not found");
            }

            if (await _manager.Contains(request.Server_uid))
            {
                return await _manager.ResetMqttClientStats(
                    request.Server_uid,
                    request.Client_uid
                );
            }

            return null;
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class ResetMqttClientStats_PostProcessor
        : IRequestPostProcessor<ResetMqttClientStats, DTO_MqttClientStatistics>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public ResetMqttClientStats_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            ResetMqttClientStats request,
            DTO_MqttClientStatistics response,
            CancellationToken cancellationToken
        )
        {
            if (response is null)
            {
                return;
            }

            await _publisher.Publish<MqttServerClientStatsResetNotifi>(
                new MqttServerClientStatsResetNotifi(
                    request.Server_uid,
                    response
                ),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}