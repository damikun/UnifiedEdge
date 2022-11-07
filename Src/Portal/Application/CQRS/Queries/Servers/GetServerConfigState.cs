using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Server.Manager;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt ServerConfig
    /// </summary>
    public class GetServerConfigState
        : CommandBase<DTO_ServerConfigState>
    {
        public string Guid { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetServerConfig Field Validator
    /// </summary>
    public class GetServerConfigValidator
        : AbstractValidator<GetServerConfigState>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetServerConfigValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Guid)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("Server uid not found");
        }

        public async Task<bool> Exist(
            string uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == uid, cancellationToken);
        }
    }

    /// <summary>
    /// GetServerConfig Field Authorization validator
    /// </summary>
    public class GetServerConfigAuthorizationValidator
        : AuthorizationValidator<GetServerConfigState>
    {
        public GetServerConfigAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetServerConfig</c> command </summary>
    public class GetServerConfigHandler
        : IRequestHandler<GetServerConfigState, DTO_ServerConfigState>
    {
        /// <summary>
        /// Injected <c>IServerManager</c>
        /// </summary>
        private readonly IServerManager _manager;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetServerConfigHandler(IServerManager manager, IMapper mapper)
        {
            _manager = manager;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>GetServerConfig</c>
        /// </summary>
        public async Task<DTO_ServerConfigState> Handle(
            GetServerConfigState request, CancellationToken cancellationToken)
        {
            var config_state = await _manager.ServerConfigState(request.Guid);

            return _mapper.Map<DTO_ServerConfigState>(config_state);
        }
    }
}