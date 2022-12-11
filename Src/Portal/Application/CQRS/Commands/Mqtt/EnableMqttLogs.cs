using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Server.Manager.Mqtt;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// EnableMqttLogs
    /// </summary>
    [Authorize]
    public class EnableMqttLogs
        : CommandBase<DTO_MqttServer>
    {
        public string ServerUid { get; set; }

        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableMqttLogs
    /// </summary>
    public class EnableMqttLogsValidator
        : AbstractValidator<EnableMqttLogs>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public EnableMqttLogsValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade
        )
        {
            _factory = factory;

            _fascade = fascade;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.ServerUid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInDatabase)
            .WithMessage("Server not found");

            RuleFor(e => e.ServerUid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInRuntime)
            .WithMessage("Server not found");
        }

        public async Task<bool> ExistInRuntime(
            string ServerUid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(ServerUid);
        }

        public async Task<bool> ExistInDatabase(
            string ServerUid,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(
                    e => e.UID == ServerUid,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// Authorization validators - EnableMqttLogs
    /// </summary>
    public class EnableMqttLogsAuthorizationValidator
        : AuthorizationValidator<EnableMqttLogs>
    {
        public EnableMqttLogsAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableMqttLogsHandler</c> command </summary>
    public class EnableMqttLogsHandler
        : IRequestHandler<EnableMqttLogs, DTO_MqttServer>
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
        public EnableMqttLogsHandler(
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
        /// Command handler for <c>EnableMqttLogs</c>
        /// </summary>
        public async Task<DTO_MqttServer> Handle(
            EnableMqttLogs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
            .Where(e => e.UID == request.ServerUid)
            .OfType<MqttServer>()
            .FirstAsync(cancellationToken);

            server.EnableLogging = request.Enable;

            dbContext.Servers.Update(server);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServer>(server);
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class EnableMqttLogs_PostProcessor
        : IRequestPostProcessor<EnableMqttLogs, DTO_MqttServer>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;


        public EnableMqttLogs_PostProcessor(
            IMemoryCache cache,
            IServerFascade fascade,
            Aplication.Services.IPublisher publisher
        )
        {
            _fascade = fascade;

            _publisher = publisher;
        }

        public async Task Process(
            EnableMqttLogs request,
            DTO_MqttServer response,
            CancellationToken cancellationToken
        )
        {
            var m = _fascade.GetManager<IMqttServerManager>();

            await m.EnableLogging(request.ServerUid, request.Enable);
        }
    }

}