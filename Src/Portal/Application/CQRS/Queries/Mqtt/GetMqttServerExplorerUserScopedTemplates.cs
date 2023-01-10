using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server Explorer User scoped Saved Subscriptions
    /// </summary>
    public class GetMqttServerExplorerUserScopedTemplates
        : CommandBase<DTO_Connection<DTO_MqttMessageTemplate>>
    {

#nullable disable
        public string ServerUid { get; set; }
#nullable enable

        public CursorArguments Arguments { get; init; }

        public GetMqttServerExplorerUserScopedTemplates(
            CursorArguments arguments,
            string server_uid
        )
        {
            Arguments = arguments;
            ServerUid = server_uid;
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerExplorerUserScopedTemplates Field Validator
    /// </summary>
    public class GetMqttServerExplorerUserScopedTemplatesValidator
        : AbstractValidator<GetMqttServerExplorerUserScopedTemplates>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerExplorerUserScopedTemplatesValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.ServerUid)
                .NotNull()
                .NotEmpty()
                .MustAsync(ServerExist)
                .WithMessage("MqttServer not found");
        }

        public async Task<bool> ServerExist(
            string ServerUid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
            .AnyAsync(e => e.UID == ServerUid);
        }
    }

    /// <summary>
    /// GetMqttServerExplorerUserScopedTemplates Field Authorization validator
    /// </summary>
    public class GetMqttServerExplorerUserScopedTemplatesAuthorizationValidator
        : AuthorizationValidator<GetMqttServerExplorerUserScopedTemplates>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        public GetMqttServerExplorerUserScopedTemplatesAuthorizationValidator(ICurrentUser current_user)
        {
            _current_user = current_user;

            RuleFor(e => e)
            .Must(ExistValidUserSubId)
            .WithMessage("Missing user profile data");
        }

        public bool ExistValidUserSubId(GetMqttServerExplorerUserScopedTemplates command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerExplorerUserScopedTemplates</c> command </summary>
    public class GetMqttServerExplorerUserScopedTemplatesHandler
        : IRequestHandler<GetMqttServerExplorerUserScopedTemplates, DTO_Connection<DTO_MqttMessageTemplate>>
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
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_MqttMessageTemplate> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerExplorerUserScopedTemplatesHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICurrentUser current_user,
            ICursorPagination<DTO_MqttMessageTemplate> cursor_provider)
        {
            _mapper = mapper;

            _current_user = current_user;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerExplorerUserScopedTemplates</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttMessageTemplate>> Handle(
            GetMqttServerExplorerUserScopedTemplates request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var sub_id = _current_user.UserId;

            var queriable = dbContext.MqttMessageTemplates
            .AsNoTracking()
            .Where(e =>
                e.ServerUid == request.ServerUid &&
                e.UserUid == sub_id
            )
            .AsQueryable();

            Func<CancellationToken, Task<int>> total_count = (ct) => queriable.CountAsync(ct);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                queriable.ProjectTo<DTO_MqttMessageTemplate>(_mapper.ConfigurationProvider),
                request.Arguments,
                total_count,
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttMessageTemplate>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}