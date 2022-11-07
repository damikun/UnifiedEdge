using Persistence.Portal;
using Microsoft.EntityFrameworkCore;

namespace API
{

    public static partial class ServiceExtension
    {

        public static IServiceCollection AddPersistence(
            this IServiceCollection serviceCollection,
            IConfiguration Configuration, IWebHostEnvironment Environment)
        {

            serviceCollection.AddPooledDbContextFactory<ManagmentDbCtx>(
                (s, o) => o
                    // .UseNpgsql(Configuration["ConnectionStrings:ManagmentDbCtx"], option => {
                    // option.EnableRetryOnFailure();

                    // if (Environment.IsDevelopment()) {
                    //     o.EnableDetailedErrors();
                    //     o.EnableSensitiveDataLogging();
                    // }

                    // }).UseLoggerFactory(s.GetRequiredService<ILoggerFactory>()));
                    .UseSqlite("Data Source=managment.db", option =>
                   {

                       if (Environment.IsDevelopment())
                       {
                           o.EnableDetailedErrors();
                           o.EnableSensitiveDataLogging();
                       }
                   }));

            return serviceCollection;
        }

    }
}