using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Server.Manager.Mqtt;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server client by id
    /// </summary>
    public class GetMqttServerClientById
        : CommandBase<DTO_MqttClient?>
    {

#nullable disable
        public string server_uid { get; set; }

        public string server_client_uid { get; set; }

#nullable enable

        public GetMqttServerClientById(string _server_uid, string _server_client_uid)
        {
            server_uid = _server_uid;
            server_client_uid = _server_client_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientById Field Validator
    /// </summary>
    public class GetMqttServerClientByIdValidator
        : AbstractValidator<GetMqttServerClientById>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientByIdValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerClientById Field Authorization validator
    /// </summary>
    public class GetMqttServerClientByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientById>
    {
        public GetMqttServerClientByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientById</c> command </summary>
    public class GetMqttServerClientByIdHandler
        : IRequestHandler<GetMqttServerClientById, DTO_MqttClient?>
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
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_MqttClient?> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerClientByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttClient?> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClientById</c>
        /// </summary>
        public async Task<DTO_MqttClient?> Handle(
            GetMqttServerClientById request,
            CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var clients = await manager.GetClients(request.server_uid);


            var client = clients
            .Where(e => e.Uid == request.server_client_uid)
            .FirstOrDefault();

            return client;
        }
    }
}