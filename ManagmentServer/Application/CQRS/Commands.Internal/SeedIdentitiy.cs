using MediatR;
using IdentityModel;
using Domain.Server;
using Aplication.Core;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SeedIdentitiy
    /// </summary>
    public class SeedIdentitiy : CommandBase<Unit>
    {
        public SeedIdentitiy()
        {
            this.Flags.diable_tracing = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SeedIdentitiyHandler</c> command </summary>
    public class SeedIdentitiyHandler
        : IRequestHandler<SeedIdentitiy, Unit>
    {

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
        public SeedIdentitiyHandler(
            IUserStore<ApplicationUser> userStore,
            UserManager<ApplicationUser> userManager
        )
        {
            _userStore = userStore;

            _userManager = userManager;
        }

        /// <summary>
        /// Command handler for <c>SeedIdentitiy</c>
        /// </summary>
        public async Task<Unit> Handle(SeedIdentitiy request, CancellationToken cancellationToken)
        {
            var exist = await _userStore.FindByNameAsync("admin", cancellationToken);

            if (exist != null)
            {
                return Unit.Value;
            }

            var user = new ApplicationUser()
            {
                UserName = "Admin",
                FirstName = "Lord",
                LastName = "Dracula",
                EmailConfirmed = true,
                TwoFactorEnabled = false,
            };

            var identitiy = await _userManager.CreateAsync(user, "Admin");

            if (!identitiy.Succeeded)
            {
                throw new Exception(identitiy.Errors.First().Description);
            }

            var result = await _userManager.AddClaimsAsync(user, new Claim[]{
                new Claim(JwtClaimTypes.Name, user.UserName),
                new Claim(JwtClaimTypes.Role, "admin"),
                new Claim(JwtClaimTypes.GivenName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
            });

            return Unit.Value;
        }
    }

}