
using Domain.Server;
using ElectronNET.API;
using Persistence.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Identitiy;

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

            return serviceCollection;
        }
    }
}