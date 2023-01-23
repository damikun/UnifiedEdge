using Domain.Server;
using IdentityModel;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;

namespace API
{

    public sealed class ClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>
    {
        public ClaimsPrincipalFactory(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor
        )
                : base(userManager, roleManager, optionsAccessor)
        {


        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
        {
            var identity = await base.GenerateClaimsAsync(user)
            .ConfigureAwait(false);

            if (!identity.HasClaim(x => x.Type == JwtClaimTypes.Subject))
            {
                var sub = user.Id;
                identity.AddClaim(new Claim(JwtClaimTypes.Subject, sub));
            }

            return identity;
        }
    }
}