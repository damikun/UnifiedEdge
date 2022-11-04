using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// UpdateUserEnabled
    /// </summary>
    // [Authorize]
    public class UpdateUserEnabled : CommandBase<DTO_User>
    {
        public string UserId;

        public bool Enable;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateUserEnabled
    /// </summary>
    public class UpdateUserEnabledValidator : AbstractValidator<UpdateUserEnabled>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IUserStore<ApplicationUser> _store;

        private readonly ICurrentUser _current;

        public UpdateUserEnabledValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IUserStore<ApplicationUser> store,
            ICurrentUser current
            )
        {
            _factory = factory;

            _store = store;

            _current = current;

            RuleFor(e => e.UserId)
            .MinimumLength(3);

            RuleFor(e => e.UserId)
            .MustAsync(Exist)
            .WithMessage("User not found");

            RuleFor(e => e.UserId)
            .Must(IsNotCurrent)
            .WithMessage("Cannot disable yourself");
        }

        public async Task<bool> Exist(
            string id,
            CancellationToken cancellationToken)
        {
            return (await _store.FindByIdAsync(id, cancellationToken)) != null;
        }

        public bool IsNotCurrent(string id)
        {
            if (string.IsNullOrWhiteSpace(_current.UserId))
            {
                return true;
            }

            return id.Equals(_current.UserId, StringComparison.OrdinalIgnoreCase);
        }

    }

    /// <summary>
    /// Authorization validators - UpdateUserEnabled
    /// </summary>
    public class UpdateUserEnabledAuthorizationValidator : AuthorizationValidator<UpdateUserEnabled>
    {
        public UpdateUserEnabledAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateUserEnabledHandler</c> command </summary>
    public class UpdateUserEnabledHandler : IRequestHandler<UpdateUserEnabled, DTO_User>
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
        public UpdateUserEnabledHandler(
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
        /// Command handler for <c>UpdateUserEnabled</c>
        /// </summary>
        public async Task<DTO_User> Handle(UpdateUserEnabled request, CancellationToken cancellationToken)
        {
            var user = await _userStore.FindByIdAsync(request.UserId, cancellationToken);

            user.Enabled = request.Enable;

            var result = await _userManager.UpdateAsync(user);

            if (user.Enabled)
            {
                try
                {
                    var logins = await _userManager.GetLoginsAsync(user);

                    foreach (var login in logins)
                    {
                        try
                        {
                            await _userManager.RemoveLoginAsync(user, login.LoginProvider, login.ProviderKey);
                        }
                        catch
                        {

                        }
                    }
                }
                catch
                {

                }

            }
            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user data");
            }

            return _mapper.Map<DTO_User>(user);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class UpdateUserEnabled_PostProcessor
        : IRequestPostProcessor<UpdateUserEnabled, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateUserEnabled_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateUserEnabled request,
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