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

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server autentication users
    /// </summary>
    public class GetMqttServerAuthUsers
        : CommandBase<DTO_Connection<DTO_MqttAuthUser>>
    {

#nullable disable
        public string server_uid { get; set; }
#nullable enable

        public GetMqttServerAuthUsers(
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
    /// GetMqttServerAuthUsers Field Validator
    /// </summary>
    public class GetMqttServerAuthUsersValidator
        : AbstractValidator<GetMqttServerAuthUsers>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthUsersValidator(
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
    /// GetMqttServerAuthUsers Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthUsersAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthUsers>
    {
        public GetMqttServerAuthUsersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthUsers</c> command </summary>
    public class GetMqttServerAuthUsersHandler
        : IRequestHandler<GetMqttServerAuthUsers, DTO_Connection<DTO_MqttAuthUser>>
    {
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
        private readonly ICursorPagination<DTO_MqttAuthUser> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthUsersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthUser> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthUsers</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttAuthUser>> Handle(
            GetMqttServerAuthUsers request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var auth_clinets = dbContext.MqttAuthUsers
            .AsNoTracking()
            .Where(e =>
                e.Server != null &&
                e.Server.UID == request.server_uid
            )
            .ProjectTo<DTO_MqttAuthUser>(_mapper.ConfigurationProvider)
            .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) =>
                auth_clinets
                .CountAsync(ct);

            var cursor_data = await _cursor_provider
            .ApplyQueriablePagination(
                auth_clinets,
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttAuthUser>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}