using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
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
    public class GetMqttServerClientsState
        : CommandBase<Dictionary<(string serverUid, string clientUid), bool>>
    {

#nullable disable
        public IReadOnlyList<(string serverUid, string clientUid)> Keys { get; set; }

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientsState Field Validator
    /// </summary>
    public class GetMqttServerClientsStateValidator
        : AbstractValidator<GetMqttServerClientsState>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientsStateValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.Keys)
            .NotNull()
            .NotEmpty();
        }
    }

    /// <summary>
    /// GetMqttServerClientsState Field Authorization validator
    /// </summary>
    public class GetMqttServerClientsStateAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientsState>
    {
        public GetMqttServerClientsStateAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientsState</c> command </summary>
    public class GetMqttServerClientsStateHandler
        : IRequestHandler<GetMqttServerClientsState, Dictionary<(string serverUid, string clientUid), bool>>
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
        public GetMqttServerClientsStateHandler(
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
        /// Command handler for <c>GetMqttServerClientsState</c>
        /// </summary>
        public async Task<Dictionary<(string serverUid, string clientUid), bool>> Handle(
            GetMqttServerClientsState request,
            CancellationToken cancellationToken
        )
        {
            var grouped = request.Keys.GroupBy(e => e.serverUid);

            Dictionary<(string serverUid, string clientUid), bool> result = new Dictionary<(string serverUid, string clientUid), bool>();

            foreach (var item in grouped)
            {
                try
                {
                    IMqttServerManager m = (IMqttServerManager)await _fascade.GetManager(item.Key);

                    if (m is null)
                    {
                        continue;
                    };

                    var ids = item.Select(e => e.clientUid).ToArray();

                    var clients = await m.GetClientsState(item.Key, ids);

                    var partial_result = clients.ToDictionary(e => (item.Key, e.Key), s => s.Value);

                    result = result.Concat(partial_result).ToDictionary(e => e.Key, s => s.Value);
                }
                catch
                {
                    continue;
                }
            }

            return result;
        }
    }
}