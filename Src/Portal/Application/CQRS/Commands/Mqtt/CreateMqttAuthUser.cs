using MediatR;
using AutoMapper;
using Domain.Server;
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
    /// CreateMqttAuthUser
    /// </summary>
    [Authorize]
    public class CreateMqttAuthUser
        : CommandBase<DTO_MqttAuthUser>
    {
#nullable disable
        public string Server_uid;

        public string UserName;

        public string Password;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateMqttAuthUser
    /// </summary>
    public class CreateMqttAuthUserValidator
        : AbstractValidator<CreateMqttAuthUser>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateMqttAuthUserValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(ServerExist)
                .WithMessage("Server not found");

            RuleFor(e => e.Password)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);

            RuleFor(e => e.UserName)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);

            RuleFor(e => e)
                .MustAsync(IsUniqueUserNameForServerId)
                .WithMessage("Username allready defined");
        }

        public async Task<bool> ServerExist(
            string Uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Uid);
        }

        public async Task<bool> IsUniqueUserNameForServerId(
            CreateMqttAuthUser request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var normalised_userName = request.UserName
                .ToLowerInvariant();

            return !await dbContext.MqttAuthUsers
                .Where(
                    e => e.Server != null &&
                    e.Server.UID == request.Server_uid
                )
                .AnyAsync(
                    e => e.UserName == normalised_userName,
                    cancellationToken
                );
        }
    }

    /// <summary>
    /// Authorization validators - CreateMqttAuthUser
    /// </summary>
    public class CreateMqttAuthUserAuthorizationValidator
        : AuthorizationValidator<CreateMqttAuthUser>
    {
        public CreateMqttAuthUserAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateMqttAuthUserHandler</c> command </summary>
    public class CreateMqttAuthUserHandler
        : IRequestHandler<CreateMqttAuthUser, DTO_MqttAuthUser>
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
        public CreateMqttAuthUserHandler(
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
        /// Command handler for <c>CreateMqttAuthUser</c>
        /// </summary>
        public async Task<DTO_MqttAuthUser> Handle(
            CreateMqttAuthUser request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server_id = await dbContext.Servers
            .Where(e => e.UID == request.Server_uid)
            .Select(e => e.ID)
            .FirstOrDefaultAsync(cancellationToken);

            if (server_id == default)
            {
                throw new Exception("Failed to faind specific server");
            }

            var hashed_password = _hasher.Hash(request.Password);

            var user = new MqttAuthUser()
            {
                UserName = request.UserName.ToLowerInvariant(),
                Password = hashed_password,
                Enabled = true,
            };

            var server = dbContext
            .MqttAuthUsers
            .Add(user);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttAuthUser>(user);

        }
    }

    //---------------------------------------
    //---------------------------------------


    public class CreateMqttAuthUser_PostProcessor
        : IRequestPostProcessor<CreateMqttAuthUser, DTO_MqttAuthUser>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateMqttAuthUser_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateMqttAuthUser request,
            DTO_MqttAuthUser response,
            CancellationToken cancellationToken
        )
        {

            // publish event?
        }
    }

}