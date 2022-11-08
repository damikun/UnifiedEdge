using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetUserAdmin
    /// </summary>
    [Authorize]
    public class SetUserAdmin : CommandBase<DTO_User>
    {
        public string UserId;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetUserAdmin
    /// </summary>
    public class SetUserAdminValidator : AbstractValidator<SetUserAdmin>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IUserStore<ApplicationUser> _store;

        public SetUserAdminValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
             IUserStore<ApplicationUser> store
            )
        {
            _factory = factory;

            _store = store;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.UserId)
            .MinimumLength(3);

            RuleFor(e => e.UserId)
            .MinimumLength(3)
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
    /// Authorization validators - SetUserAdmin
    /// </summary>
    public class SetUserAdminAuthorizationValidator : AuthorizationValidator<SetUserAdmin>
    {
        public SetUserAdminAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetUserAdminHandler</c> command </summary>
    public class SetUserAdminHandler : IRequestHandler<SetUserAdmin, DTO_User>
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
        public SetUserAdminHandler(
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
        /// Command handler for <c>SetUserAdmin</c>
        /// </summary>
        public async Task<DTO_User> Handle(SetUserAdmin request, CancellationToken cancellationToken)
        {
            var user = await _userStore.FindByIdAsync(request.UserId, cancellationToken);

            var user_claims = await _userManager.GetClaimsAsync(user);

            var roles = await _userManager.GetRolesAsync(user);

            if (await _userManager.IsInRoleAsync(user, "admin"))
            {
                return _mapper.Map<DTO_User>(user);
            }

            var result = await _userManager.AddToRoleAsync(user, "admin");

            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user data");
            }

            return _mapper.Map<DTO_User>(user);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetUserAdmin_PostProcessor
        : IRequestPostProcessor<SetUserAdmin, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetUserAdmin_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetUserAdmin request,
            DTO_User response,
            CancellationToken cancellationToken
        )
        {

            if (response == null)
            {
                return;
            }

            try
            {
                await _publisher.Publish<UserUpdatedNotifi>(
                    new UserUpdatedNotifi(response),
                    Services.PublishStrategy.ParallelNoWait
                );
            }
            catch (Exception ex)
            {
                // Log?
            }
        }
    }

}