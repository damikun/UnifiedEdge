
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Mqtt;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddIdentitiy(this IServiceCollection serviceCollection)
        {

            // serviceCollection.AddIdentityServer()
            // .AddInMemoryIdentityResources(Config.IdentityResources)
            // .AddInMemoryApiScopes(Config.ApiScopes)
            // .AddInMemoryClients(Config.Clients)
            // .AddTestUsers(TestUsers.Users);

            // var migrationsAssembly = typeof(Program).Assembly.GetName().Name;
            // const string connectionString = @"Data Source=Duende.IdentityServer.Quickstart.EntityFramework.db";

            // serviceCollection.AddIdentityServer()
            //     .AddConfigurationStore(options =>
            //     {
            //         options.ConfigureDbContext = b => b.UseSqlite(connectionString,
            //             sql => sql.MigrationsAssembly(migrationsAssembly));
            //     })
            //     .AddOperationalStore(options =>
            //     {
            //         options.ConfigureDbContext = b => b.UseSqlite(connectionString,
            //             sql => sql.MigrationsAssembly(migrationsAssembly));
            //     });

            return serviceCollection;
        }
    }
}