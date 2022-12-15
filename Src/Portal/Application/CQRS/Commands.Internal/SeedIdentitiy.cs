using MediatR;
using IdentityModel;
using Domain.Server;
using Aplication.Core;
using Persistence.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        /// <summary>
        /// Injected <c>RoleManager</c>
        /// </summary>
        private readonly RoleManager<IdentityRole> _roleManager;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SeedIdentitiyHandler(
            IUserStore<ApplicationUser> userStore,
            UserManager<ApplicationUser> userManager,
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
            RoleManager<IdentityRole> roleManager
        )
        {
            _factory = factory;

            _userStore = userStore;

            _roleManager = roleManager;

            _userManager = userManager;
        }

        /// <summary>
        /// Command handler for <c>SeedIdentitiy</c>
        /// </summary>
        public async Task<Unit> Handle(SeedIdentitiy request, CancellationToken cancellationToken)
        {
            PortalIdentityDbContextPooled context = await _factory
            .CreateDbContextAsync(cancellationToken);

            // Default Admin Role
            var roleExist = await _roleManager.RoleExistsAsync("admin");

            if (!roleExist)
            {
                await _roleManager.CreateAsync(new IdentityRole("admin"));
            }

            //Check admin user exist

            var normalised = "Admin".ToUpperInvariant();

            var exist = await context.Users
            .AnyAsync(e => e.NormalizedUserName == normalised, cancellationToken);

            if (exist == true)
            {
                return Unit.Value;
            }

            var user = new ApplicationUser()
            {
                UserName = "Admin",
                FirstName = "Lord",
                LastName = "Dracula",
                Enabled = true,
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
                new Claim(JwtClaimTypes.GivenName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
                new Claim("scope", "view"),
                new Claim("scope", "write"),
            });

            try
            {
                var role_result = await _userManager.AddToRoleAsync(user, "admin");

                if (!role_result.Succeeded)
                {
                    foreach (var item in role_result.Errors)
                    {
                        // System.Console.WriteLine(item.Description);
                    }
                }
            }
            catch (Exception ex)
            {
                // System.Console.WriteLine(ex);
            }


            return Unit.Value;
        }
    }

}