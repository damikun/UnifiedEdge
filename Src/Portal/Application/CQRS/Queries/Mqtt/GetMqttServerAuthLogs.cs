using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server autentication logs
    /// </summary>
    public class GetMqttServerAuthLogs
        : CommandBase<DTO_Connection<DTO_MqttAuthLog>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public long? auth_client_id { get; set; }

        public long? auth_user_id { get; set; }

        public GetMqttServerAuthLogs(
            CursorArguments arguments,
            string uid
        )
        {
            Arguments = arguments;
            server_uid = uid;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerAuthLogs Field Validator
    /// </summary>
    public class GetMqttServerAuthLogsValidator
        : AbstractValidator<GetMqttServerAuthLogs>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthLogsValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist)
            .WithMessage("Server not found");
        }

        public async Task<bool> Exist(
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
    /// GetMqttServerAuthLogs Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthLogsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthLogs>
    {
        public GetMqttServerAuthLogsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthLogs</c> command </summary>
    public class GetMqttServerAuthLogsHandler
        : IRequestHandler<GetMqttServerAuthLogs, DTO_Connection<DTO_MqttAuthLog>>
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
        private readonly ICursorPagination<DTO_MqttAuthLog> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthLogsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthLog> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthLogs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttAuthLog>> Handle(
            GetMqttServerAuthLogs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.Servers
            .OfType<MqttServer>()
            .AsNoTracking()
            .Where(e => e.UID == request.server_uid)
            .SelectMany(e => e.AuthLogs)
            .ProjectTo<DTO_MqttAuthLog>(_mapper.ConfigurationProvider);

            if (request.auth_client_id is not null)
            {
                query = query.Where(e => e.AuthClientId == request.auth_client_id);
            }

            if (request.auth_user_id is not null)
            {
                query = query.Where(e => e.AuthUserId == request.auth_user_id);
            }

            Func<CancellationToken, Task<int>> total_count = (ct) =>
                query
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                query,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttAuthLog>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}