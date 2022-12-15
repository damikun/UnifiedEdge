using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace API;

public static class IdentitiyCfg
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope(name: "view",  displayName: "View", userClaims: new[] { "scope" }),
            new ApiScope(name: "write",  displayName: "Write", userClaims: new[] { "scope" }),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // machine to machine client

            new Client
            {
                ClientId = "api_client",

                AllowedGrantTypes = new List<string>(),

                AllowedScopes = { "view" }
            },

            new Client
            {
                ClientId = "client",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,

                AllowedScopes = { "view" }
            },

            // interactive ASP.NET Core Web App
            new Client
            {
                ClientId = "web",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.Code,
                    
                // where to redirect to after login
                RedirectUris = { "https://localhost:5002/signin-oidc" },

                // where to redirect to after logout
                PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

                AllowOfflineAccess = true,

                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "view",
                    "write"
                }
            }
        };
}
