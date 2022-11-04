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
    /// Query Mqtt Server topics stats
    /// </summary>
    public class GetMqttServerTopicStats : CommandBase<DTO_Connection<DTO_MqttServerTopicStat>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerTopicStats(CursorArguments arguments, string uid)
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerTopics Field Validator
    /// </summary>
    public class GetMqttServerTopicsValidator : AbstractValidator<GetMqttServerTopicStats>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerTopicsValidator(IServerFascade fascade)
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
    /// GetMqttServerTopics Field Authorization validator
    /// </summary>
    public class GetMqttServerTopicsAuthorizationValidator : AuthorizationValidator<GetMqttServerTopicStats>
    {
        public GetMqttServerTopicsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerTopics</c> command </summary>
    public class GetMqttServerTopicsStatsHandler : IRequestHandler<GetMqttServerTopicStats, DTO_Connection<DTO_MqttServerTopicStat>>
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
        private readonly ICursorPagination<DTO_MqttServerTopicStat> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerTopicsStatsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttServerTopicStat> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>DTO_MqttServerTopicStat</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttServerTopicStat>> Handle(
            GetMqttServerTopicStats request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            var topic_stat = await manager.GetServerTopicStatistics(request.server_uid);

            Func<CancellationToken, Task<int>> total_count = (ct) => Task.FromResult(topic_stat.Count());

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                topic_stat.AsQueryable(),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttServerTopicStat>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}