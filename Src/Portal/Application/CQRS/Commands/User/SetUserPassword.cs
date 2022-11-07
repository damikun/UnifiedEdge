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
    /// SetUserPassword
    /// </summary>
    // [Authorize]
    public class SetUserPassword : CommandBase<DTO_User>
    {
        public string UserId;

        public string CurrentPassword;

        public string NewPassword;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetUserPassword
    /// </summary>
    public class SetUserPasswordValidator : AbstractValidator<SetUserPassword>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IUserStore<ApplicationUser> _store;
        public SetUserPasswordValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            UserManager<ApplicationUser> userManager,
            IUserStore<ApplicationUser> store
        )
        {
            _store = store;

            _factory = factory;

            _userManager = userManager;

            RuleFor(e => e.UserId)
            .MinimumLength(3);

            RuleFor(e => e.UserId)
            .MinimumLength(3)
            .MustAsync(UserExist)
            .WithMessage("User not found");

            RuleFor(e => e.CurrentPassword)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.NewPassword)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.NewPassword)
            .MustAsync(BeValidPassword)
            .WithMessage("Invalid Password");
        }

        public async Task<bool> BeValidPassword(
            string pass,
            CancellationToken cancellationToken)
        {
            var validators = _userManager.PasswordValidators;

            foreach (var validator in validators)
            {
                var result = await validator.ValidateAsync(_userManager, null!, pass);

                if (!result.Succeeded)
                {
                    return false;
                }
            }

            return true;
        }


        public async Task<bool> BeUniqueUserName(
            string name,
            CancellationToken cancellationToken)
        {
            return (await _userManager.FindByNameAsync(name)) == null;
        }

        public async Task<bool> UserExist(
            string id,
            CancellationToken cancellationToken)
        {
            return (await _store.FindByIdAsync(id, cancellationToken)) != null;
        }

    }

    /// <summary>
    /// Authorization validators - SetUserPassword
    /// </summary>
    public class SetUserPasswordAuthorizationValidator : AuthorizationValidator<SetUserPassword>
    {
        public SetUserPasswordAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetUserPasswordHandler</c> command </summary>
    public class SetUserPasswordHandler : IRequestHandler<SetUserPassword, DTO_User>
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
        public SetUserPasswordHandler(
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
        /// Command handler for <c>SetUserPassword</c>
        /// </summary>
        public async Task<DTO_User> Handle(SetUserPassword request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            var result = await _userManager.ChangePasswordAsync(
                user,
                request.CurrentPassword,
                request.NewPassword
            );

            if (!result.Succeeded)
            {
                new Exception("Failed to change password");
            }

            return _mapper.Map<DTO_User>(user);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetUserPassword_PostProcessor
        : IRequestPostProcessor<SetUserPassword, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetUserPassword_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetUserPassword request,
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