using MediatR;
using AutoMapper;
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
    /// Query Mqtt Server autentication clients
    /// </summary>
    public class GetMqttServerAuthClients
        : CommandBase<DTO_Connection<DTO_MqttAuthClient>>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerAuthClients(
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
    /// GetMqttServerAuthClients Field Validator
    /// </summary>
    public class GetMqttServerAuthClientsValidator
        : AbstractValidator<GetMqttServerAuthClients>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthClientsValidator(
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
    /// GetMqttServerAuthClients Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthClientsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthClients>
    {
        public GetMqttServerAuthClientsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthClients</c> command </summary>
    public class GetMqttServerAuthClientsHandler
        : IRequestHandler<GetMqttServerAuthClients, DTO_Connection<DTO_MqttAuthClient>>
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
        private readonly ICursorPagination<DTO_MqttAuthClient> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthClientsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthClient> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthClients</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttAuthClient>> Handle(
            GetMqttServerAuthClients request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var auth_clinets = dbContext.MqttAuthClients
            .AsNoTracking()
            .Where(e =>
                e.Server != null &&
                e.Server.UID == request.server_uid
            )
            .Include(e => e.Rules)
            .ProjectTo<DTO_MqttAuthClient>(_mapper.ConfigurationProvider)
            .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) =>
                auth_clinets
                .CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                auth_clinets,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttAuthClient>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}