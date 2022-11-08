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
    /// RemoveUser
    /// </summary>
    [Authorize]
    public class RemoveUser : CommandBase<DTO_User>
    {
        public string UserId;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RemoveUser
    /// </summary>
    public class RemoveUserValidator : AbstractValidator<RemoveUser>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IUserStore<ApplicationUser> _store;

        private readonly ICurrentUser _current;

        public RemoveUserValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IUserStore<ApplicationUser> store,
            ICurrentUser current,
            UserManager<ApplicationUser> _manager
            )
        {
            _factory = factory;

            _current = current;

            _store = store;

            RuleFor(e => e.UserId)
            .Cascade(CascadeMode.Stop)
            .MinimumLength(3);

            RuleFor(e => e.UserId)
                .MustAsync(Exist)
                .WithMessage("User not found");

            RuleFor(e => e.UserId)
                .Must(IsAuthenticated)
                .WithMessage("User must be Authenticated");

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

        public bool IsAuthenticated(string id)
        {
            if (_current.IsAuthenticated)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool IsNotCurrent(string id)
        {
            if (string.IsNullOrWhiteSpace(_current.UserId))
            {
                return false;
            }

            return id.Equals(_current.UserId, StringComparison.OrdinalIgnoreCase) == false;
        }

    }

    /// <summary>
    /// Authorization validators - RemoveUser
    /// </summary>
    public class RemoveUserAuthorizationValidator : AuthorizationValidator<RemoveUser>
    {
        public RemoveUserAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveUserHandler</c> command </summary>
    public class RemoveUserHandler : IRequestHandler<RemoveUser, DTO_User>
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
        public RemoveUserHandler(
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
        /// Command handler for <c>RemoveUser</c>
        /// </summary>
        public async Task<DTO_User> Handle(RemoveUser request, CancellationToken cancellationToken)
        {
            var user = await _userStore.FindByIdAsync(request.UserId, cancellationToken);

            var dto = _mapper.Map<DTO_User>(user);

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

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to remove user");
            }

            return dto;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class RemoveUser_PostProcessor
        : IRequestPostProcessor<RemoveUser, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public RemoveUser_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            RemoveUser request,
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
                await _publisher.Publish<UserRemovedNotifi>(
                    new UserRemovedNotifi(response),
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