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
    public class GetMqttServerClientsSessions
        : CommandBase<Dictionary<(string server_id, string server_client_id), DTO_MqttClientSession?>>
    {

#nullable disable
        public IReadOnlyList<(string server_id, string server_client_id)> compositKeys { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientsSessions Field Validator
    /// </summary>
    public class GetMqttServerClientsSessionsValidator
        : AbstractValidator<GetMqttServerClientsSessions>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientsSessionsValidator(IServerFascade fascade)
        {
            _fascade = fascade;
        }

    }

    /// <summary>
    /// GetMqttServerClientsSessions Field Authorization validator
    /// </summary>
    public class GetMqttServerClientsSessionsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientsSessions>
    {
        public GetMqttServerClientsSessionsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientsSessions</c> command </summary>
    public class GetMqttServerClientsSessionsHandler
        : IRequestHandler<GetMqttServerClientsSessions, Dictionary<(string server_id, string server_client_id), DTO_MqttClientSession?>>
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
        public GetMqttServerClientsSessionsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClientsSessions</c>
        /// </summary>
        public async Task<Dictionary<(string server_id, string server_client_id), DTO_MqttClientSession?>> Handle(
            GetMqttServerClientsSessions request, CancellationToken cancellationToken)
        {
            Dictionary<(string server_id, string server_client_id), DTO_MqttClientSession?> response
                = new Dictionary<(string server_id, string server_client_id), DTO_MqttClientSession?>();

            foreach (var key in request.compositKeys)
            {

                if (key.server_id == null || key.server_client_id == null)
                {
                    continue;
                }

                try
                {
                    IMqttServerManager manager = (IMqttServerManager)_fascade.GetManager(key.server_id);

                    var clients = await manager.GetClients(key.server_id);

                    var client = clients
                    .Where(e => e.Uid == key.server_client_id)
                    .FirstOrDefault();

                    if (client == null)
                    {
                        response.Add((key.server_id, key.server_client_id), null);
                    }
                    else
                    {
                        DTO_MqttClientSession? session = null;

                        session = await manager.GetClientSession(key.server_id, key.server_client_id);

                        response.Add((key.server_id, key.server_client_id), session);
                    }
                }
                catch
                {
                    response.Add((key.server_id, key.server_client_id), null);
                }

            }

            return response;
        }
    }
}