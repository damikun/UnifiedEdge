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
    public class GetUserRoles
        : CommandBase<List<string>>
    {
        public string UserId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUserRoles Field Validator
    /// </summary>
    public class GetUserRolesValidator
        : AbstractValidator<GetUserRoles>
    {
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        public GetUserRolesValidator(
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
    /// GetUserRoles Field Authorization validator
    /// </summary>
    public class GetUserRolesAuthorizationValidator
        : AuthorizationValidator<GetUserRoles>
    {
        public GetUserRolesAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUserRoles</c> command </summary>
    public class GetUserRolesHandler
        : IRequestHandler<GetUserRoles, List<string>>
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
        public GetUserRolesHandler(
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
        /// Command handler for <c>GetUserRoles</c>
        /// </summary>
        public async Task<List<string>> Handle(
            GetUserRoles request,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            var user = await _manager.FindByIdAsync(request.UserId);

            var response = await _manager.GetRolesAsync(user);

            return response.ToList();
        }

    }
}