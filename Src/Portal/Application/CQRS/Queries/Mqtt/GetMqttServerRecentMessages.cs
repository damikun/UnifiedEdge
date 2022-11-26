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
        public string Server_uid { get; set; }
#nullable enable

#nullable enable
        public string? Client_uid { get; set; }

        public string? Topic_uid { get; set; }
#nullable disable


        public GetMqttServerRecentMessages(
            CursorArguments arguments,
            string server_uid,
            string client_uid,
            string topic_uid
        )
        {
            Arguments = arguments;
            Server_uid = server_uid;
            Client_uid = client_uid;
            Topic_uid = topic_uid;
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

        /// <summary>
        /// Injected <c>IMqttServerManager</c>
        /// </summary>

        private readonly IMqttServerManager _manager;

        public GetMqttServerRecentMessagesValidator(
            IServerFascade fascade,
            IMqttServerManager manager
        )
        {
            _fascade = fascade;

            _manager = manager;

            RuleFor(e => e.Server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ServereExist).WithMessage("Server not found");

            RuleFor(e => e)
            .MustAsync(ClientExist).WithMessage("Client not found");

            RuleFor(e => e)
            .MustAsync(TopicExist).WithMessage("Topic not found");
        }

        public async Task<bool> ServereExist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }

        public async Task<bool> ClientExist(
            GetMqttServerRecentMessages command,
            CancellationToken cancellationToken)
        {

            if (command.Client_uid is null)
            {
                return true;
            }

            return await _manager.ContainsClient(
                command.Server_uid,
                command.Client_uid
            );
        }

        public async Task<bool> TopicExist(
            GetMqttServerRecentMessages command,
            CancellationToken cancellationToken)
        {

            if (command.Topic_uid is null)
            {
                return true;
            }

            return await _manager.ContainsTopic(
                command.Server_uid,
                command.Topic_uid
            );
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
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.Server_uid);

            // var messages = await manager.GetRecentMessages(request.Server_uid);

            var messages = await manager.GetRecentMessages(
                request.Server_uid,
                request.Topic_uid,
                request.Client_uid
            );

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