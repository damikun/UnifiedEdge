using MediatR;
using AutoMapper;
using Persistence.Portal;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetMqttServerClientPresistentSession
    /// </summary>
    // [Authorize]
    public class SetMqttServerClientPresistentSession
        : CommandBase<DTO_MqttServerClientCfg>
    {
#nullable disable
        public string Server_uid;

        public bool PresistSession;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetMqttServerClientPresistentSession
    /// </summary>
    public class SetMqttServerClientPresistentSessionValidator
        : AbstractValidator<SetMqttServerClientPresistentSession>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IEndpointProvider _e_provider;

        public SetMqttServerClientPresistentSessionValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IEndpointProvider e_provider
        )
        {
            _factory = factory;

            _e_provider = e_provider;

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
    /// Authorization validators - SetMqttServerClientPresistentSession
    /// </summary>
    public class SetMqttServerClientPresistentSessionAuthorizationValidator
        : AuthorizationValidator<SetMqttServerClientPresistentSession>
    {
        public SetMqttServerClientPresistentSessionAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetMqttServerClientPresistentSessionHandler</c> command </summary>
    public class SetMqttServerClientPresistentSessionHandler
        : IRequestHandler<SetMqttServerClientPresistentSession, DTO_MqttServerClientCfg>
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
        public SetMqttServerClientPresistentSessionHandler(
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
        /// Command handler for <c>SetMqttServerClientPresistentSession</c>
        /// </summary>
        public async Task<DTO_MqttServerClientCfg> Handle(
            SetMqttServerClientPresistentSession request,
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
                server_cfg.PresistentSession = request.PresistSession;
                server_cfg.TimeStamp = DateTime.Now;
            }

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServerClientCfg>(server_cfg);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetMqttServerClientPresistentSession_PostProcessor
        : IRequestPostProcessor<SetMqttServerClientPresistentSession, DTO_MqttServerClientCfg>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetMqttServerClientPresistentSession_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetMqttServerClientPresistentSession request,
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