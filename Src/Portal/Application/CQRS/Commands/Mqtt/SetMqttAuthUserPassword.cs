using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetMqttAuthUserPassword
    /// </summary>
    [Authorize]
    public class SetMqttAuthUserPassword
        : CommandBase<DTO_MqttAuthUser>
    {
#nullable disable
        public long AuthUserid;
        public string NewPassword;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetMqttAuthUserPassword
    /// </summary>
    public class SetMqttAuthUserPasswordValidator
        : AbstractValidator<SetMqttAuthUserPassword>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetMqttAuthUserPasswordValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.AuthUserid)
                .NotEmpty()
                .NotNull()
                .MustAsync(Exist)
                .WithMessage("Auth client not found");

            RuleFor(e => e.NewPassword)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);
        }

        public async Task<bool> Exist(
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthUsers
                .AnyAsync(e => e.Id == id);
        }
    }

    /// <summary>
    /// Authorization validators - SetMqttAuthUserPassword
    /// </summary>
    public class SetMqttAuthUserPasswordAuthorizationValidator
        : AuthorizationValidator<SetMqttAuthUserPassword>
    {
        public SetMqttAuthUserPasswordAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetMqttAuthUserPasswordHandler</c> command </summary>
    public class SetMqttAuthUserPasswordHandler
        : IRequestHandler<SetMqttAuthUserPassword, DTO_MqttAuthUser>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IPasswordHasher</c>
        /// </summary>
        private readonly IPasswordHasher _hasher;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SetMqttAuthUserPasswordHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IPasswordHasher hasher
        )
        {
            _hasher = hasher;

            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;
        }

        /// <summary>
        /// Command handler for <c>SetMqttAuthUserPassword</c>
        /// </summary>
        public async Task<DTO_MqttAuthUser> Handle(
            SetMqttAuthUserPassword request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var authUser = await dbContext.MqttAuthUsers
            .Where(e => e.Id == request.AuthUserid)
            .FirstAsync(cancellationToken);

            var hashed_password = _hasher.Hash(request.NewPassword);

            authUser.Password = hashed_password;

            dbContext.MqttAuthUsers.Update(authUser);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthUser>(authUser);

        }
    }

    //---------------------------------------
    //---------------------------------------


    public class SetMqttAuthUserPassword_PostProcessor
        : IRequestPostProcessor<SetMqttAuthUserPassword, DTO_MqttAuthUser>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetMqttAuthUserPassword_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetMqttAuthUserPassword request,
            DTO_MqttAuthUser response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}