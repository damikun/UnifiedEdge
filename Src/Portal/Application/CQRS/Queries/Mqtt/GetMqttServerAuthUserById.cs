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
    /// Query Mqtt Server autentication user by Id
    /// </summary>
    public class GetMqttServerAuthUserById
        : CommandBase<DTO_MqttAuthUser>
    {

#nullable disable
        public long user_id { get; set; }
#nullable enable

        public GetMqttServerAuthUserById(
            long id
        )
        {
            user_id = id;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerAuthUserById Field Validator
    /// </summary>
    public class GetMqttServerAuthUserByIdValidator
        : AbstractValidator<GetMqttServerAuthUserById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthUserByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.user_id)
            .GreaterThan(0)
            .MustAsync(Exist)
            .WithMessage("AuthClient not found");
        }

        public async Task<bool> Exist(
            long user_id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
                .AnyAsync(
                    e => e.Id == user_id,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// GetMqttServerAuthUserById Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthUserByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthUserById>
    {
        public GetMqttServerAuthUserByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthUserById</c> command </summary>
    public class GetMqttServerAuthUserByIdHandler
        : IRequestHandler<GetMqttServerAuthUserById, DTO_MqttAuthUser>
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
        public GetMqttServerAuthUserByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthUser> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthUserById</c>
        /// </summary>
        public async Task<DTO_MqttAuthUser> Handle(
            GetMqttServerAuthUserById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
            .AsNoTracking()
            .Where(e =>
                e.Id == request.user_id
            )
            .ProjectTo<DTO_MqttAuthUser>(
                _mapper.ConfigurationProvider
            )
            .FirstAsync(cancellationToken);
        }
    }
}