
using Domain.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using IdentityServerAspNetIdentity.Data;
using Aplication.Services.Identitiy;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddIdentitiy(this IServiceCollection serviceCollection)
        {
            System.Net.ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);

            serviceCollection.AddRazorPages();

            serviceCollection.AddDbContext<IdentityDbContext>(options =>
                options.UseSqlite("Data Source=identity.db")
            );

            serviceCollection.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<IdentityDbContext>()
            .AddDefaultTokenProviders();

            serviceCollection
            .AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
            })
            .AddInMemoryIdentityResources(IdentitiyCfg.IdentityResources)
            .AddInMemoryApiScopes(IdentitiyCfg.ApiScopes)
            .AddInMemoryClients(IdentitiyCfg.Clients)
            .AddAspNetIdentity<ApplicationUser>()
            .AddProfileService<CustomProfileService>();

            return serviceCollection;
        }

        private static bool AcceptAllCertifications(
            object sender,
            System.Security.Cryptography.X509Certificates.X509Certificate certification,
            System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors
        )
        {
            return true;
        }
    }
}