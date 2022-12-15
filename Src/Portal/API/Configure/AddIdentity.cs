
using Domain.Server;
using ElectronNET.API;
using Persistence.Identity;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Identitiy;
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
                // custom scheme defined in .AddPolicyScheme() below
                options.DefaultScheme = "JWT_OR_COOKIE";
                options.DefaultChallengeScheme = "JWT_OR_COOKIE";
            });

            serviceCollection.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredLength = 5;
            })
            .AddEntityFrameworkStores<PortalIdentityDbContext>()
            .AddDefaultTokenProviders();

            serviceCollection
            .AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                if (HybridSupport.IsElectronActive)
                {
                    options.Endpoints.EnableUserInfoEndpoint = false;
                }
                // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
            })
            .AddInMemoryIdentityResources(IdentitiyCfg.IdentityResources)
            .AddInMemoryApiScopes(IdentitiyCfg.ApiScopes)
            .AddInMemoryClients(IdentitiyCfg.Clients)
            .AddAspNetIdentity<ApplicationUser>()
            .AddProfileService<CustomProfileService>()
            .AddInMemoryCaching();

            serviceCollection.AddAuthentication(options =>
            {
                // custom scheme defined in .AddPolicyScheme() below
                options.DefaultScheme = "JWT_OR_ID";
                options.DefaultChallengeScheme = "JWT_OR_ID";
                options.DefaultAuthenticateScheme = "JWT_OR_ID";
            })
            .AddJwtBearer(options =>
            {
                // base-address of your identityserver
                options.Authority = "https://localhost:5001";

                options.RequireHttpsMetadata = false;

                // audience is optional, make sure you read the following paragraphs
                // to understand your options
                options.TokenValidationParameters.ValidateAudience = false;
                options.TokenValidationParameters.ValidateActor = false;
                options.TokenValidationParameters.ValidateIssuer = false;
                options.TokenValidationParameters.ValidateIssuerSigningKey = false;

                options.TokenValidationParameters.ValidateTokenReplay = false;

                options.BackchannelHttpHandler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback =
                            (message, certificate, chain, sslPolicyErrors) => true
                };

                options.SaveToken = true;

                options.MapInboundClaims = true;

                // it's recommended to check the type header to avoid "JWT confusion" attacks
                options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = async ctx =>
                     {
                         var exceptionMessage = ctx.Exception;
                     },

                    OnTokenValidated = async ctx =>
                    {

                    },
                    OnForbidden = async ctx =>
                    {

                    },
                };
            })

            .AddPolicyScheme("JWT_OR_ID", "JWT_OR_ID", options =>
            {
                // runs on each request
                options.ForwardDefaultSelector = context =>
                {
                    string authorization = context.Request.Headers[HeaderNames.Authorization];
                    if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
                        return "Bearer";

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
                    policy.RequireClaim("scope", "write");
                });
            });

            return serviceCollection;
        }
    }
}