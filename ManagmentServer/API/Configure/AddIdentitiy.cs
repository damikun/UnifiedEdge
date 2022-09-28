
using Microsoft.AspNetCore.Identity;
using Server.Mqtt;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddIdentitiy(this IServiceCollection serviceCollection)
        {

            // serviceCollection.AddIdentity<ApplicationUser, IdentityRole>()
            //     .AddEntityFrameworkStores<ApplicationDbContext>()
            //     .AddDefaultTokenProviders();

            // serviceCollection.AddIdentityServer()
            //     .AddAspNetIdentity<ApplicationUser>();

            return serviceCollection;
        }
    }
}