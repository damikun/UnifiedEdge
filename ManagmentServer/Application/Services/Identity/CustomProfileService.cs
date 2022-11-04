using Domain.Server;
using Duende.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Duende.IdentityServer.AspNetIdentity;
using System.Security.Claims;

namespace Aplication.Services.Identitiy
{
    public class CustomProfileService : ProfileService<ApplicationUser>
    {
        public CustomProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory) : base(userManager, claimsFactory)
        {
        }

        protected override async Task GetProfileDataAsync(ProfileDataRequestContext context, ApplicationUser user)
        {
            var principal = await GetUserClaimsAsync(user);

            var id = (ClaimsIdentity)principal.Identity;

            context.AddRequestedClaims(principal.Claims);
        }
    }
}
