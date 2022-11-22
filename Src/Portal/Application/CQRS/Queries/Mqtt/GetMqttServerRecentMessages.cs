using MediatR;
using AutoMapper;
using Aplication.DTO;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Server.Manager.Mqtt;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server recent messages
    /// </summary>
    public class GetMqttServerRecentMessages
        : CommandBase<DTO_Connection<DTO_MqttMessage>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerRecentMessages(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerRecentMessages Field Validator
    /// </summary>
    public class GetMqttServerRecentMessagesValidator
        : AbstractValidator<GetMqttServerRecentMessages>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerRecentMessagesValidator(IServerFascade fascade)
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
    /// GetMqttServerRecentMessages Field Authorization validator
    /// </summary>
    public class GetMqttServerRecentMessagesAuthorizationValidator
        : AuthorizationValidator<GetMqttServerRecentMessages>
    {
        public GetMqttServerRecentMessagesAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerRecentMessages</c> command </summary>
    public class GetMqttServerRecentMessagesHandler
        : IRequestHandler<GetMqttServerRecentMessages, DTO_Connection<DTO_MqttMessage>>
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
        private readonly ICursorPagination<DTO_MqttMessage> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerRecentMessagesHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttMessage> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerRecentMessages</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttMessage>> Handle(
            GetMqttServerRecentMessages request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var messages = await manager.GetRecentMessages(request.server_uid);

            Func<CancellationToken, Task<int>> total_count = (ct) => Task.FromResult(messages.Count());

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                messages.AsQueryable(),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttMessage>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}