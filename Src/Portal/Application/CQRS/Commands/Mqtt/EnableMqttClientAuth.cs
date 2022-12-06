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
    /// EnableMqttClientAuth
    /// </summary>
    [Authorize]
    public class EnableMqttClientAuth
        : CommandBase<DTO_MqttAuthCfg>
    {
        public string ServerUid { get; set; }

        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableMqttClientAuth
    /// </summary>
    public class EnableMqttClientAuthValidator
        : AbstractValidator<EnableMqttClientAuth>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableMqttClientAuthValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.ServerUid)
                .NotNull()
                .NotEmpty()
                .MustAsync(ServerExist)
                .WithMessage("MqttServer not found");
        }

        public async Task<bool> ServerExist(
            string ServerUid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
            .AnyAsync(e => e.UID == ServerUid);
        }
    }

    /// <summary>
    /// Authorization validators - EnableMqttClientAuth
    /// </summary>
    public class EnableMqttClientAuthAuthorizationValidator
        : AuthorizationValidator<EnableMqttClientAuth>
    {
        public EnableMqttClientAuthAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableMqttClientAuthHandler</c> command </summary>
    public class EnableMqttClientAuthHandler
        : IRequestHandler<EnableMqttClientAuth, DTO_MqttAuthCfg>
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
        public EnableMqttClientAuthHandler(
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
        /// Command handler for <c>EnableMqttClientAuth</c>
        /// </summary>
        public async Task<DTO_MqttAuthCfg> Handle(
            EnableMqttClientAuth request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var cfg_id = await dbContext.Servers
            .AsNoTracking()
            .Where(e => e.UID == request.ServerUid)
            .OfType<MqttServer>()
            .Select(e => e.AuthConfig.Id)
            .FirstAsync(cancellationToken);

            var cfg = await dbContext.MqttAuthConfig
            .Where(e => e.Id == cfg_id)
            .FirstAsync(cancellationToken);

            cfg.ClientAuthEnabled = request.Enable;

            dbContext.MqttAuthConfig.Update(cfg);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthCfg>(cfg);
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class EnableMqttClientAuth_PostProcessor
        : IRequestPostProcessor<EnableMqttClientAuth, DTO_MqttAuthCfg>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableMqttClientAuth_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableMqttClientAuth request,
            DTO_MqttAuthCfg response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}