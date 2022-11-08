using MediatR;
using AutoMapper;
using IdentityModel;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Identity;
using System.Security.Claims;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.ComponentModel.DataAnnotations;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CreateUser
    /// </summary>
    [Authorize]
    public class CreateUser : CommandBase<DTO_User>
    {
        [NonSerialized()]
        [DataType(DataType.Password)]
        public string Password;

        public string UserName;

        public string FirstName;

        public string LastName;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateUser
    /// </summary>
    public class CreateUserValidator : AbstractValidator<CreateUser>
    {
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        private readonly UserManager<ApplicationUser> _userManager;

        public CreateUserValidator(
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
             UserManager<ApplicationUser> userManager
            )
        {
            _factory = factory;

            _userManager = userManager;

            RuleFor(e => e.FirstName)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.LastName)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.Password)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.UserName)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.UserName)
            .MustAsync(BeUniqueUserName)
            .WithMessage("Username is allready used");

        }

        public async Task<bool> BeUniqueUserName(
            string name,
            CancellationToken cancellationToken)
        {
            PortalIdentityDbContextPooled context = await _factory
            .CreateDbContextAsync(cancellationToken);

            var normalised = name.ToUpperInvariant();

            return (await context.Users
            .AnyAsync(e => e.NormalizedUserName == normalised, cancellationToken)) == false;
        }

    }

    /// <summary>
    /// Authorization validators - CreateUser
    /// </summary>
    public class CreateUserAuthorizationValidator : AuthorizationValidator<CreateUser>
    {
        public CreateUserAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateUserHandler</c> command </summary>
    public class CreateUserHandler : IRequestHandler<CreateUser, DTO_User>
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
        public CreateUserHandler(
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
        /// Command handler for <c>CreateUser</c>
        /// </summary>
        public async Task<DTO_User> Handle(CreateUser request, CancellationToken cancellationToken)
        {
            var user = new ApplicationUser()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmailConfirmed = true,
                TwoFactorEnabled = false,
                Enabled = true
            };

            await _userStore.SetUserNameAsync(user, request.UserName, cancellationToken);

            var identitiy = await _userManager.CreateAsync(user, request.Password);

            if (!identitiy.Succeeded)
            {
                throw new Exception(identitiy.Errors.First().Description);
            }

            var result = await _userManager.AddClaimsAsync(user, new Claim[]{
                new Claim(JwtClaimTypes.Name, user.UserName),
                new Claim(JwtClaimTypes.GivenName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
            });

            return _mapper.Map<DTO_User>(user);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class CreateUser_PostProcessor
        : IRequestPostProcessor<CreateUser, DTO_User>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateUser_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateUser request,
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
                await _publisher.Publish<UserCreatedNotifi>(
                    new UserCreatedNotifi(response),
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