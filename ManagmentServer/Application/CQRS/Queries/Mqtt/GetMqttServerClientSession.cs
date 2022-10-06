using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Server.Manager.Mqtt;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server client session
    /// </summary>
    public class GetMqttServerClientSession
        : CommandBase<DTO_MqttClientSession?>
    {

#nullable disable
        public string server_uid { get; set; }

        public string server_client_uid { get; set; }

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientSession Field Validator
    /// </summary>
    public class GetMqttServerClientSessionValidator
        : AbstractValidator<GetMqttServerClientSession>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientSessionValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty();
            // .MustAsync(Exist).WithMessage("Server client not found");
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerClientSession Field Authorization validator
    /// </summary>
    public class GetMqttServerClientSessionAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientSession>
    {
        public GetMqttServerClientSessionAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientSession</c> command </summary>
    public class GetMqttServerClientSessionHandler
        : IRequestHandler<GetMqttServerClientSession, DTO_MqttClientSession?>
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
        public GetMqttServerClientSessionHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClientSession</c>
        /// </summary>
        public async Task<DTO_MqttClientSession?> Handle(
            GetMqttServerClientSession request, CancellationToken cancellationToken)
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            return await manager.GetClientSession(request.server_uid, request.server_client_uid);
        }
    }
}