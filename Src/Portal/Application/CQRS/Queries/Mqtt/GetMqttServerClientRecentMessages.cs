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
    /// Query Mqtt Server client recent messages
    /// </summary>
    public class GetMqttServerClientRecentMessages : CommandBase<DTO_Connection<DTO_MqttMessage>>
    {

#nullable disable
        public string server_uid { get; set; }

        public string topic_uid { get; set; }

#nullable enable

        public GetMqttServerClientRecentMessages(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientRecentMessages Field Validator
    /// </summary>
    public class GetMqttServerClientRecentMessagesValidator : AbstractValidator<GetMqttServerClientRecentMessages>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientRecentMessagesValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.topic_uid)
            .NotNull()
            .NotEmpty();
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerClientRecentMessages Field Authorization validator
    /// </summary>
    public class GetMqttServerClientRecentMessagesAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientRecentMessages>
    {
        public GetMqttServerClientRecentMessagesAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientRecentMessages</c> command </summary>
    public class GetMqttServerClientRecentMessagesHandler
        : IRequestHandler<GetMqttServerClientRecentMessages, DTO_Connection<DTO_MqttMessage>>
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
        public GetMqttServerClientRecentMessagesHandler(
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
        /// Command handler for <c>GetMqttServerClientRecentMessages</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttMessage>> Handle(
            GetMqttServerClientRecentMessages request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var messages = await manager.GetClientRecentMessages(request.server_uid, request.topic_uid);

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