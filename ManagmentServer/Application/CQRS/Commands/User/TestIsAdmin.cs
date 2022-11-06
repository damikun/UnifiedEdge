using MediatR;
using AutoMapper;
using IdentityModel;
using Domain.Server;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.CQRS.Behaviours;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// TestIsAdmin
    /// </summary>
    // [Authorize]
    public class TestIsAdmin : CommandBase<bool>
    {
        public string UserId;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - TestIsAdmin
    /// </summary>
    public class TestIsAdminValidator
        : AbstractValidator<TestIsAdmin>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IUserStore<ApplicationUser> _store;

        public TestIsAdminValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
             IUserStore<ApplicationUser> store
            )
        {
            _factory = factory;

            _store = store;

            RuleFor(e => e.UserId)
            .MinimumLength(3);

            RuleFor(e => e.UserId)
            .MustAsync(Exist)
            .WithMessage("User not found");
        }

        public async Task<bool> Exist(
            string id,
            CancellationToken cancellationToken)
        {
            return (await _store.FindByIdAsync(id, cancellationToken)) != null;
        }

    }

    /// <summary>
    /// Authorization validators - TestIsAdmin
    /// </summary>
    public class TestIsAdminAuthorizationValidator
        : AuthorizationValidator<TestIsAdmin>
    {
        public TestIsAdminAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>TestIsAdminHandler</c> command </summary>
    public class TestIsAdminHandler
        : IRequestHandler<TestIsAdmin, bool>
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
        /// Injected <c>SignInManager</c>
        /// </summary>
        private readonly SignInManager<ApplicationUser> _signInManager;

        /// <summary>
        /// Injected <c>IUserStore</c>
        /// </summary>
        private readonly IUserStore<ApplicationUser> _userStore;

        /// <summary>
        /// Injected <c>UserManager</c>
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Main constructor
        /// </summary>
        public TestIsAdminHandler(
            IMapper mapper,
            IMediator mediator,
            SignInManager<ApplicationUser> signInManager,
            IUserStore<ApplicationUser> userStore,
            UserManager<ApplicationUser> userManager
        )
        {
            _mapper = mapper;

            _mediator = mediator;

            _userStore = userStore;

            _signInManager = signInManager;

            _userManager = userManager;
        }

        /// <summary>
        /// Command handler for <c>TestIsAdmin</c>
        /// </summary>
        public async Task<bool> Handle(TestIsAdmin request, CancellationToken cancellationToken)
        {
            var user = await _userStore.FindByIdAsync(request.UserId, cancellationToken);

            return await _userManager.IsInRoleAsync(user, "admin");
        }
    }
}