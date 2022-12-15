using Domain.Server;
using IdentityModel;
using Duende.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Duende.IdentityServer.Extensions;
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

            context.AddRequestedClaims(principal.Claims);

            context.IssuedClaims.Add(
                new Claim(JwtClaimTypes.Subject, user.Id)
            );

            if (context.Subject.GetAuthenticationMethod() == OidcConstants.GrantTypes.TokenExchange)
            {
                var act = context.Subject.FindFirst(JwtClaimTypes.Actor);
                if (act != null)
                {
                    context.IssuedClaims.Add(act);
                }
            }
        }
    }
}