
using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server client cfg
    /// </summary>
    public class GetMqttServerClientConfig
        : CommandBase<DTO_MqttServerClientCfg?>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerClientConfig(string _server_uid)
        {
            server_uid = _server_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientConfig Field Validator
    /// </summary>
    public class GetMqttServerClientConfigValidator
        : AbstractValidator<GetMqttServerClientConfig>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerClientConfigValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            return await dbContext.Servers
                .AsNoTracking()
                .OfType<MqttServer>()
                .AnyAsync(cancellationToken);
        }

    }

    /// <summary>
    /// GetMqttServerClientConfig Field Authorization validator
    /// </summary>
    public class GetMqttServerClientConfigAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientConfig>
    {
        public GetMqttServerClientConfigAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientConfig</c> command </summary>
    public class GetMqttServerClientConfigHandler
        : IRequestHandler<GetMqttServerClientConfig, DTO_MqttServerClientCfg?>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerClientConfigHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper
        )
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClientConfig</c>
        /// </summary>
        public async Task<DTO_MqttServerClientCfg?> Handle(
            GetMqttServerClientConfig request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .AsNoTracking()
                .OfType<MqttServer>()
                .Where(e => e.UID == request.server_uid)
                .Include(e => e.Cfg)
                .FirstAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServerClientCfg>(server.Cfg as MqttServerCfg);
        }
    }
}