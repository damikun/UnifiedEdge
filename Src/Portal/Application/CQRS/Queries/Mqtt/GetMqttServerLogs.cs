using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Server.Manager.Mqtt;
using MQTTnet.Diagnostics;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server instance logs
    /// </summary>
    public class GetMqttServerLogs
        : CommandBase<DTO_Connection<DTO_MqttServerLog>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public MqttNetLogLevel? Level { get; set; }

        public GetMqttServerLogs(
            CursorArguments arguments,
            string uid,
            MqttNetLogLevel? level = null
        )
        {
            Arguments = arguments;
            server_uid = uid;
            Level = level;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerLogs Field Validator
    /// </summary>
    public class GetMqttServerLogsValidator
        : AbstractValidator<GetMqttServerLogs>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerLogsValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade
        )
        {
            _factory = factory;

            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInDatabase)
            .WithMessage("Server not found");

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInRuntime)
            .WithMessage("Server not found");
        }

        public async Task<bool> ExistInRuntime(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }

        public async Task<bool> ExistInDatabase(
            string server_uid,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(
                    e => e.UID == server_uid,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// GetMqttServerLogs Field Authorization validator
    /// </summary>
    public class GetMqttServerLogsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerLogs>
    {
        public GetMqttServerLogsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerLogs</c> command </summary>
    public class GetMqttServerLogsHandler
        : IRequestHandler<GetMqttServerLogs, DTO_Connection<DTO_MqttServerLog>>
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
        private readonly ICursorPagination<DTO_MqttServerLog> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerLogsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttServerLog> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerLogs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttServerLog>> Handle(
            GetMqttServerLogs request,
            CancellationToken cancellationToken
        )
        {
            var m = _fascade.GetManager<IMqttServerManager>();

            var logs = await m.GetServerLogs(request.server_uid);

            logs = logs.OrderByDescending(e => e.TimeStamp);

            if (request.Level is not null)
            {
                logs = logs.Where(e => e.LogLevel == request.Level);
            }

            // Todo needs to use IAsync enumerable under GetServerLogs...
            // Temporary..
            var mapped_logs = _mapper.Map<List<DTO_MqttServerLog>>(logs);

            Func<CancellationToken, Task<int>> total_count = (ct) =>
                Task.FromResult(mapped_logs.Count());

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                mapped_logs.AsQueryable(),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttServerLog>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}