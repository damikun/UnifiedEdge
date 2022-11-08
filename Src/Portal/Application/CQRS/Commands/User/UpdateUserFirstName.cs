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
    /// UpdateUserFirstName
    /// </summary>
    [Authorize]
    public class UpdateUserFirstName : CommandBase<DTO_User>
    {
        public string UserId;

        public string FirstName;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateUserFirstName
    /// </summary>
    public class UpdateUserFirstNameValidator : AbstractValidator<UpdateUserFirstName>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IUserStore<ApplicationUser> _store;

        public UpdateUserFirstNameValidator(
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

            RuleFor(e => e.FirstName)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);
        }

        public async Task<bool> Exist(
            string id,
            CancellationToken cancellationToken)
        {
            return (await _store.FindByIdAsync(id, cancellationToken)) != null;
        }

    }

    /// <summary>
    /// Authorization validators - UpdateUserFirstName
    /// </summary>
    public class UpdateUserFirstNameAuthorizationValidator : AuthorizationValidator<UpdateUserFirstName>
    {
        public UpdateUserFirstNameAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateUserFirstNameHandler</c> command </summary>
    public class UpdateUserFirstNameHandler : IRequestHandler<UpdateUserFirstName, DTO_User>
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
        public UpdateUserFirstNameHandler(
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
        /// Command handler for <c>UpdateUserFirstName</c>
        /// </summary>
        public async Task<DTO_User> Handle(UpdateUserFirstName request, CancellationToken cancellationToken)
        {
            var user = await _userStore.FindByIdAsync(request.UserId, cancellationToken);

            user.FirstName = request.FirstName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception("Failed to update user data");
            }

            return _mapper.Map<DTO_User>(user);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class UpdateUserFirstName_PostProcessor
        : IRequestPostProcessor<UpdateUserFirstName, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateUserFirstName_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateUserFirstName request,
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