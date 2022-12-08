using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Server.Manager.Mqtt;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server instance log by Id
    /// </summary>
    public class GetMqttServerLogById
        : CommandBase<DTO_MqttServerLog?>
    {

#nullable disable
        public string Server_uid { get; set; }
#nullable enable

#nullable disable
        public string Log_uid { get; set; }
#nullable enable

        public GetMqttServerLogById(
            string server_uid,
            string log_uid
        )
        {
            Server_uid = server_uid;
            Log_uid = log_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerLogById Field Validator
    /// </summary>
    public class GetMqttServerLogByIdValidator
        : AbstractValidator<GetMqttServerLogById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerLogByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade
        )
        {
            _factory = factory;

            _fascade = fascade;

            RuleFor(e => e.Server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInDatabase)
            .WithMessage("Server not found");

            RuleFor(e => e.Server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInRuntime)
            .WithMessage("Server not found");

            RuleFor(e => e.Log_uid)
            .NotNull()
            .NotEmpty();
        }

        public async Task<bool> ExistInRuntime(
                    string server_uid,
                    CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }

        public async Task<bool> ExistInDatabase(
            string server_uid,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(
                    e => e.UID == server_uid,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// GetMqttServerLogById Field Authorization validator
    /// </summary>
    public class GetMqttServerLogByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerLogById>
    {
        public GetMqttServerLogByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerLogById</c> command </summary>
    public class GetMqttServerLogByIdHandler
        : IRequestHandler<GetMqttServerLogById, DTO_MqttServerLog?>
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
        public GetMqttServerLogByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerLogById</c>
        /// </summary>
        public async Task<DTO_MqttServerLog?> Handle(
            GetMqttServerLogById request,
            CancellationToken cancellationToken
        )
        {
            var m = _fascade.GetManager<IMqttServerManager>();

            var log = await m.GetServerLog(request.Server_uid, request.Log_uid);

            return _mapper.Map<DTO_MqttServerLog?>(log);
        }
    }
}