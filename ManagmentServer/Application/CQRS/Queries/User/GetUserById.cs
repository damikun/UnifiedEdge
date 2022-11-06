using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Persistence.Identity;
using Microsoft.AspNetCore.Http;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query user by Id
    /// </summary>
    public class GetUserById : CommandBase<DTO_User?>
    {
        public string UserId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUserById Field Validator
    /// </summary>
    public class GetUserByIdValidator
        : AbstractValidator<GetUserById>
    {
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        public GetUserByIdValidator(
            IDbContextFactory<PortalIdentityDbContextPooled> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.UserId)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("User not found");
        }

        public async Task<bool> Exist(
            string id,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            return await dbContext.Users
                .AnyAsync(e => e.Id == id, cancellationToken);
        }
    }

    /// <summary>
    /// GetUserById Field Authorization validator
    /// </summary>
    public class GetUserByIdAuthorizationValidator
        : AuthorizationValidator<GetUserById>
    {
        public GetUserByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUserById</c> command </summary>
    public class GetUserByIdHandler
        : IRequestHandler<GetUserById, DTO_User?>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IDbContextFactory<PortalIdentityDbContextPooled></c>
        /// </summary>
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        /// <summary>
        /// Injected <c>IHttpContextAccessor</c>
        /// </summary>
        private readonly IHttpContextAccessor _accessor;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetUserByIdHandler(
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
            ICurrentUser currentuser,
            IHttpContextAccessor accessor,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _accessor = accessor;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetUserById</c>
        /// </summary>
        public async Task<DTO_User?> Handle(
            GetUserById request,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            var user = await dbContext.Users
            .Where(e => e.Id == request.UserId)
            .FirstAsync(cancellationToken);

            return _mapper.Map<DTO_User>(user);
        }

    }
}