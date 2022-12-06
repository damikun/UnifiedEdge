using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server autentication user by Id
    /// </summary>
    public class GetMqttServerAuthCfg
        : CommandBase<DTO_MqttAuthCfg>
    {

#nullable disable
        public string ServerUid { get; set; }
#nullable enable

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerAuthCfg Field Validator
    /// </summary>
    public class GetMqttServerAuthCfgValidator
        : AbstractValidator<GetMqttServerAuthCfg>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthCfgValidator(
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
    /// GetMqttServerAuthCfg Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthCfgAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthCfg>
    {
        public GetMqttServerAuthCfgAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthCfg</c> command </summary>
    public class GetMqttServerAuthCfgHandler
        : IRequestHandler<GetMqttServerAuthCfg, DTO_MqttAuthCfg>
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
        private readonly ICursorPagination<DTO_MqttAuthCfg> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthCfgHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthCfg> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthCfg</c>
        /// </summary>
        public async Task<DTO_MqttAuthCfg> Handle(
            GetMqttServerAuthCfg request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var cfg = await dbContext.Servers
            .AsNoTracking()
            .Where(e => e.UID == request.ServerUid)
            .OfType<MqttServer>()
            .Select(e => e.AuthConfig)
            .FirstAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthCfg>(cfg);
        }
    }
}