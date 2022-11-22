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
    /// Query Mqtt Server topic recent messages
    /// </summary>
    public class GetMqttServerTopicRecentMessages : CommandBase<DTO_Connection<DTO_MqttMessage>>
    {

#nullable disable
        public string server_uid { get; set; }

        public string topic_uid { get; set; }

#nullable enable

        public GetMqttServerTopicRecentMessages(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerTopicRecentMessages Field Validator
    /// </summary>
    public class GetMqttServerTopicRecentMessagesValidator : AbstractValidator<GetMqttServerTopicRecentMessages>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerTopicRecentMessagesValidator(IServerFascade fascade)
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
    /// GetMqttServerTopicRecentMessages Field Authorization validator
    /// </summary>
    public class GetMqttServerTopicRecentMessagesAuthorizationValidator
        : AuthorizationValidator<GetMqttServerTopicRecentMessages>
    {
        public GetMqttServerTopicRecentMessagesAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerTopicRecentMessages</c> command </summary>
    public class GetMqttServerTopicRecentMessagesHandler
        : IRequestHandler<GetMqttServerTopicRecentMessages, DTO_Connection<DTO_MqttMessage>>
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
        public GetMqttServerTopicRecentMessagesHandler(
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
        /// Command handler for <c>GetMqttServerTopicRecentMessages</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttMessage>> Handle(
            GetMqttServerTopicRecentMessages request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var messages = await manager.GetTopicRecentMessages(request.server_uid, request.topic_uid);

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