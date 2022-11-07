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
    /// SetMqttServerClientMaxPendingMessages
    /// </summary>
    // [Authorize]
    public class SetMqttServerClientMaxPendingMessages
        : CommandBase<DTO_MqttServerClientCfg>
    {
#nullable disable
        public string Server_uid;

        public int MaxPendingMessages;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetMqttServerClientMaxPendingMessages
    /// </summary>
    public class SetMqttServerClientMaxPendingMessagesValidator
        : AbstractValidator<SetMqttServerClientMaxPendingMessages>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetMqttServerClientMaxPendingMessagesValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.MaxPendingMessages)
            .GreaterThanOrEqualTo(100)
            .LessThanOrEqualTo(5000);

        }

        public async Task<bool> Exist(
             string Server_uid,
             CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Server_uid);
        }
    }

    /// <summary>
    /// Authorization validators - SetMqttServerClientMaxPendingMessages
    /// </summary>
    public class SetMqttServerClientMaxPendingMessagesAuthorizationValidator
        : AuthorizationValidator<SetMqttServerClientMaxPendingMessages>
    {
        public SetMqttServerClientMaxPendingMessagesAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetMqttServerClientMaxPendingMessagesHandler</c> command </summary>
    public class SetMqttServerClientMaxPendingMessagesHandler
        : IRequestHandler<SetMqttServerClientMaxPendingMessages, DTO_MqttServerClientCfg>
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
        public SetMqttServerClientMaxPendingMessagesHandler(
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
        /// Command handler for <c>SetMqttServerClientMaxPendingMessages</c>
        /// </summary>
        public async Task<DTO_MqttServerClientCfg> Handle(
            SetMqttServerClientMaxPendingMessages request,
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
                server_cfg.MaxPendingMessagesPerClient = request.MaxPendingMessages;
                server_cfg.TimeStamp = DateTime.Now;
            }

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServerClientCfg>(server_cfg);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetMqttServerClientMaxPendingMessages_PostProcessor
        : IRequestPostProcessor<SetMqttServerClientMaxPendingMessages, DTO_MqttServerClientCfg>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetMqttServerClientMaxPendingMessages_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetMqttServerClientMaxPendingMessages request,
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