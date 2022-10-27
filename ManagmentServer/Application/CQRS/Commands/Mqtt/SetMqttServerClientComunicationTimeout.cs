using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetMqttServerClientComunicationTimeout
    /// </summary>
    // [Authorize]
    public class SetMqttServerClientComunicationTimeout
        : CommandBase<DTO_MqttServerClientCfg>
    {
#nullable disable
        public string Server_uid;

        public int Timeout_ms;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetMqttServerClientComunicationTimeout
    /// </summary>
    public class SetMqttServerClientComunicationTimeoutValidator
        : AbstractValidator<SetMqttServerClientComunicationTimeout>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetMqttServerClientComunicationTimeoutValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Timeout_ms)
                .GreaterThanOrEqualTo(1000)
                .LessThanOrEqualTo(50000);

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(Exist)
                .WithMessage("Server not found");

        }

        public async Task<bool> Exist(
             string Uid,
             CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Uid);
        }
    }

    /// <summary>
    /// Authorization validators - SetMqttServerClientComunicationTimeout
    /// </summary>
    public class SetMqttServerClientComunicationTimeoutAuthorizationValidator
        : AuthorizationValidator<SetMqttServerClientComunicationTimeout>
    {
        public SetMqttServerClientComunicationTimeoutAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetMqttServerClientComunicationTimeoutHandler</c> command </summary>
    public class SetMqttServerClientComunicationTimeoutHandler
        : IRequestHandler<SetMqttServerClientComunicationTimeout, DTO_MqttServerClientCfg>
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
        public SetMqttServerClientComunicationTimeoutHandler(
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
        /// Command handler for <c>SetMqttServerClientComunicationTimeout</c>
        /// </summary>
        public async Task<DTO_MqttServerClientCfg> Handle(
            SetMqttServerClientComunicationTimeout request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .OfType<MqttServer>()
                .Where(e => e.UID == request.Server_uid)
                .Include(e => e.Cfg)
                .FirstAsync(cancellationToken);

            if (server == null)
            {
                throw new Exception("Server was not found");
            }

            var server_cfg = server.Cfg as MqttServerCfg;

            if (server_cfg != null)
            {
                server_cfg.CommunicationTimeout = TimeSpan.FromMilliseconds(request.Timeout_ms);
                server_cfg.TimeStamp = DateTime.Now;
            }

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServerClientCfg>(server_cfg);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetMqttServerClientComunicationTimeout_PostProcessor
        : IRequestPostProcessor<SetMqttServerClientComunicationTimeout, DTO_MqttServerClientCfg>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetMqttServerClientComunicationTimeout_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetMqttServerClientComunicationTimeout request,
            DTO_MqttServerClientCfg response,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerConfigChangedNotifi>(
                new ServerConfigChangedNotifi(request.Server_uid),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}