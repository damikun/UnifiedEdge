using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server autentication client
    /// </summary>
    public class GetMqttServerAuthClientById
        : CommandBase<DTO_MqttAuthClient>
    {

#nullable disable
        public long client_id { get; set; }
#nullable enable

        public GetMqttServerAuthClientById(
            long id
        )
        {
            client_id = id;
        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerAuthClientById Field Validator
    /// </summary>
    public class GetMqttServerAuthClientByIdValidator
        : AbstractValidator<GetMqttServerAuthClientById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthClientByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.client_id)
            .GreaterThan(0)
            .MustAsync(Exist)
            .WithMessage("AuthClient not found");
        }

        public async Task<bool> Exist(
            long client_id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthClients
                .AnyAsync(
                    e => e.Id == client_id,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// GetMqttServerAuthClientById Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthClientByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthClientById>
    {
        public GetMqttServerAuthClientByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthClientById</c> command </summary>
    public class GetMqttServerAuthClientByIdHandler
        : IRequestHandler<GetMqttServerAuthClientById, DTO_MqttAuthClient>
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
        private readonly ICursorPagination<DTO_MqttAuthClient> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthClientByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthClient> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthClientById</c>
        /// </summary>
        public async Task<DTO_MqttAuthClient> Handle(
            GetMqttServerAuthClientById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthClients
            .AsNoTracking()
            .Where(e =>
                e.Id == request.client_id
            )
            .Include(e => e.Rules)
            .ProjectTo<DTO_MqttAuthClient>(
                _mapper.ConfigurationProvider
            )
            .FirstAsync(cancellationToken);
        }
    }
}