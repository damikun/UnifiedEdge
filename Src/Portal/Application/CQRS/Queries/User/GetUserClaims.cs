using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Persistence.Identity;
using Microsoft.AspNetCore.Http;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query user by Claims
    /// </summary>
    public class GetUserClaims
        : CommandBase<List<DTO_Claim>>
    {
        public string UserId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUserClaims Field Validator
    /// </summary>
    public class GetUserClaimsValidator
        : AbstractValidator<GetUserClaims>
    {
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        public GetUserClaimsValidator(
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
    /// GetUserClaims Field Authorization validator
    /// </summary>
    public class GetUserClaimsAuthorizationValidator
        : AuthorizationValidator<GetUserClaims>
    {
        public GetUserClaimsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUserClaims</c> command </summary>
    public class GetUserClaimsHandler
        : IRequestHandler<GetUserClaims, List<DTO_Claim>>
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
        /// Injected <c>UserManager</c>
        /// </summary>
        private readonly UserManager<ApplicationUser> _manager;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetUserClaimsHandler(
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
            UserManager<ApplicationUser> manager,
            ICurrentUser currentuser,
            IHttpContextAccessor accessor,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _manager = manager;

            _accessor = accessor;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetUserClaims</c>
        /// </summary>
        public async Task<List<DTO_Claim>> Handle(
            GetUserClaims request,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            var user = await _manager.FindByIdAsync(request.UserId);

            var claims = await _manager.GetClaimsAsync(user);

            return _mapper.Map<List<DTO_Claim>>(claims);
        }

    }
}