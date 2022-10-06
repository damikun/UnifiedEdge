using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Server.Manager.Mqtt;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server client list
    /// </summary>
    public class GetMqttServerClients : CommandBase<DTO_Connection<DTO_MqttClient>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerClients(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClients Field Validator
    /// </summary>
    public class GetMqttServerClientsValidator : AbstractValidator<GetMqttServerClients>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientsValidator(IServerFascade fascade)
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
    /// GetMqttServerClients Field Authorization validator
    /// </summary>
    public class GetMqttServerClientsAuthorizationValidator : AuthorizationValidator<GetMqttServerClients>
    {
        public GetMqttServerClientsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClients</c> command </summary>
    public class GetMqttServerClientsHandler : IRequestHandler<GetMqttServerClients, DTO_Connection<DTO_MqttClient>>
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
        private readonly ICursorPagination<DTO_MqttClient> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerClientsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttClient> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClients</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttClient>> Handle(
            GetMqttServerClients request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var clients = await manager.GetClients(request.server_uid);

            Func<CancellationToken, Task<int>> total_count = (ct) => Task.FromResult(clients.Count());

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                clients.AsQueryable(),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttClient>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}