using Domain.Server;
using IdentityModel;
using ElectronNET.API;
using Persistence.Identity;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Identitiy;
using IdentityModel.AspNetCore.OAuth2Introspection;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddIdentity(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddRazorPages();

            serviceCollection.AddDbContext<PortalIdentityDbContext>(options =>
                options.UseSqlite("Data Source=identity.db")
            );

            serviceCollection.AddPooledDbContextFactory<PortalIdentityDbContextPooled>(
            (s, o) =>
            {
                o.UseSqlite("Data Source=identity.db");
            });

            serviceCollection.AddAuthentication(options =>
            {
                // custom scheme
                options.DefaultScheme = "JWT_OR_COOKIE";
                options.DefaultChallengeScheme = "JWT_OR_COOKIE";
            });

            //!SSL is Disabled -> for introspection forwarding mechanism
            serviceCollection.AddHttpClient(OAuth2IntrospectionDefaults.BackChannelHttpClientName)
                .ConfigurePrimaryHttpMessageHandler(() => IdentitiyHelpers.GetHttpWithoutSSLHandler());

            serviceCollection.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredLength = 5;

                options.Stores.ProtectPersonalData = false;

                options.ClaimsIdentity.UserIdClaimType = JwtClaimTypes.Subject;
            })
            .AddClaimsPrincipalFactory<ClaimsPrincipalFactory>()
            .AddEntityFrameworkStores<PortalIdentityDbContext>()
            .AddDefaultTokenProviders();

            serviceCollection
            .AddIdentityServer(options =>
            {
                options.KeyManagement.DataProtectKeys = false;

                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                if (HybridSupport.IsElectronActive)
                {
                    options.Endpoints.EnableUserInfoEndpoint = false;
                }

                options.EmitStaticAudienceClaim = true;

            })
            // .AddKeyManagement()
            .AddInMemoryIdentityResources(IdentitiyCfg.IdentityResources)
            .AddInMemoryApiResources(IdentitiyCfg.ApiResources)
            .AddInMemoryApiScopes(IdentitiyCfg.ApiScopes)
            .AddInMemoryClients(IdentitiyCfg.Clients)
            .AddAspNetIdentity<ApplicationUser>()
            .AddProfileService<CustomProfileService>()
            .AddOperationalStore(options =>
            {
                options.ConfigureDbContext = builder =>
                    builder.UseSqlite("Data Source=IdentityServer.db");

                // this enables automatic token cleanup. this is optional.
                options.EnableTokenCleanup = true;
                options.TokenCleanupInterval = 3600; // interval in seconds (default is 3600)
            })
            .AddInMemoryCaching();

            serviceCollection.AddAuthentication(options =>
            {
                // custom scheme defined in .AddPolicyScheme() below
                options.DefaultScheme = "JWT_OR_ID";
                options.DefaultChallengeScheme = "JWT_OR_ID";
                options.DefaultAuthenticateScheme = "JWT_OR_ID";
            })
            .AddJwtBearer("token", options =>
            {
                options.Audience = "edgeapi";

                // base-address of your identityserver
                options.Authority = "https://localhost:5001";

                // !only for Dev!
                options.RequireHttpsMetadata = false;

                // audience is optional, make sure you read the following paragraphs
                // to understand your options
                options.TokenValidationParameters.ValidateAudience = false;
                options.TokenValidationParameters.ValidateActor = false;
                options.TokenValidationParameters.ValidateIssuer = false;
                options.TokenValidationParameters.ValidateIssuerSigningKey = false;

                options.TokenValidationParameters.ValidateTokenReplay = false;

                //!SSL is Disabled -> for internal token validation
                options.BackchannelHttpHandler = IdentitiyHelpers.GetHttpWithoutSSLHandler();

                options.ForwardDefaultSelector = IdentitiyHelpers.ForwardReferenceToken("introspection");

                options.SaveToken = true;

                options.MapInboundClaims = true;

                options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = ctx =>
                     {
                         var exceptionMessage = ctx.Exception;

                         return Task.CompletedTask;
                     },

                    OnTokenValidated = ctx =>
                    {
                        return Task.CompletedTask;
                    },
                    OnForbidden = ctx =>
                    {
                        return Task.CompletedTask;
                    },
                };
            })
            .AddOAuth2Introspection("introspection", options =>
            {
                options.Authority = "https://localhost:5001";

                options.ClientId = "edgeapi";
                options.ClientSecret = "secret";

            })
            .AddPolicyScheme("JWT_OR_ID", "JWT_OR_ID", options =>
            {
                // runs on each request
                options.ForwardDefaultSelector = context =>
                {
                    string? authorization = context.Request.Headers[HeaderNames.Authorization];
                    if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
                        return "token";

                    return IdentityConstants.ApplicationScheme;
                };
            });

            serviceCollection.AddAuthorization(options =>
            {
                options.AddPolicy("write_access", policy =>
                {
                    policy.RequireClaim("scope", "write");
                });

                options.AddPolicy("read_access", policy =>
                {
                    policy.RequireClaim("scope", "view");
                });

                options.AddPolicy("authenticated_user", policy =>
                {
                    policy.RequireAuthenticatedUser();
                });

                options.AddPolicy("FullAccess", policy =>
                    policy.RequireAssertion(context =>
                        context.User.HasClaim(c =>
                            (
                                c.Type == "write_access" &&
                                c.Type == "read_access" &&
                                c.Type == "authenticated_user"
                            )
                        )
                    )
                );
            });

            return serviceCollection;
        }
    }
}