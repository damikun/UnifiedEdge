using MediatR;
using AutoMapper;
using Persistence.Portal;
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
    /// Query Mqtt Server sessions
    /// </summary>
    public class GetMqttServerSessions
        : CommandBase<DTO_Connection<DTO_MqttClientSession>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerSessions(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerSessions Field Validator
    /// </summary>
    public class GetMqttServerSessionsValidator
        : AbstractValidator<GetMqttServerSessions>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerSessionsValidator(IServerFascade fascade)
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
    /// GetMqttServerSessions Field Authorization validator
    /// </summary>
    public class GetMqttServerSessionsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerSessions>
    {
        public GetMqttServerSessionsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerSessions</c> command </summary>
    public class GetMqttServerSessionsHandler
        : IRequestHandler<GetMqttServerSessions, DTO_Connection<DTO_MqttClientSession>>
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
        private readonly ICursorPagination<DTO_MqttClientSession> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerSessionsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttClientSession> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerSessions</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttClientSession>> Handle(
            GetMqttServerSessions request, CancellationToken cancellationToken)
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var clients = await manager.GetServerSessions(request.server_uid);

            Func<CancellationToken, Task<int>> total_count = (ct) => Task.FromResult(clients.Count());

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                clients.AsQueryable(),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttClientSession>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}