using Domain.Server;
using ElectronNET.API;
using System.Net.Security;
using Persistence.Identity;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Identitiy;
using IdentityModel.AspNetCore.OAuth2Introspection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using IdentityModel;
using Microsoft.Extensions.Options;
using System.Security.Claims;

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
                .ConfigurePrimaryHttpMessageHandler(() => GetHttpWithoutSSLHandler());

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

                options.RequireHttpsMetadata = false;

                // audience is optional, make sure you read the following paragraphs
                // to understand your options
                options.TokenValidationParameters.ValidateAudience = false;
                options.TokenValidationParameters.ValidateActor = false;
                options.TokenValidationParameters.ValidateIssuer = false;
                options.TokenValidationParameters.ValidateIssuerSigningKey = false;

                options.TokenValidationParameters.ValidateTokenReplay = false;

                //!SSL is Disabled -> for internal token validation
                options.BackchannelHttpHandler = GetHttpWithoutSSLHandler();

                options.ForwardDefaultSelector = ForwardReferenceToken("introspection");

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
                    string authorization = context.Request.Headers[HeaderNames.Authorization];
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
            });

            return serviceCollection;
        }

        private static SocketsHttpHandler GetHttpWithoutSSLHandler()
        {
            return new SocketsHttpHandler
            {
                SslOptions = new SslClientAuthenticationOptions
                {
                    RemoteCertificateValidationCallback = (
                        sender,
                        certificate,
                        chain,
                        sslPolicyErrors
                    ) => true
                }
            };
        }

        /// <summary>
        /// Provides a forwarding func for JWT vs reference tokens (based on existence of dot in token)
        /// </summary>
        /// <param name="introspectionScheme">Scheme name of the introspection handler</param>
        /// <returns></returns>
        public static Func<HttpContext, string> ForwardReferenceToken(string introspectionScheme = "introspection")
        {
            string Select(HttpContext context)
            {
                var (scheme, credential) = GetSchemeAndCredential(context);

                if (scheme.Equals("Bearer", StringComparison.OrdinalIgnoreCase) &&
                    !credential.Contains("."))
                {
                    return introspectionScheme;
                }

                return null;
            }

            return Select;
        }

        /// <summary>
        /// Extracts scheme and credential from Authorization header (if present)
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static (string, string) GetSchemeAndCredential(HttpContext context)
        {
            var header = context.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(header))
            {
                return ("", "");
            }

            var parts = header.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length != 2)
            {
                return ("", "");
            }

            return (parts[0], parts[1]);
        }
    }

    public sealed class ClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser>
    {
        public ClaimsPrincipalFactory(UserManager<ApplicationUser> userManager, IOptions<IdentityOptions> optionsAccessor)
                : base(userManager, optionsAccessor)
        {


        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
        {
            var identity = await base.GenerateClaimsAsync(user).ConfigureAwait(false);

            if (!identity.HasClaim(x => x.Type == JwtClaimTypes.Subject))
            {
                var sub = user.Id;
                identity.AddClaim(new Claim(JwtClaimTypes.Subject, sub));
            }

            return identity;
        }
    }
}