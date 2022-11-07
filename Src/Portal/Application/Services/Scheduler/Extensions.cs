using Hangfire;
using System.Diagnostics;
using Hangfire.Storage.SQLite;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.Scheduler
{
    public static partial class RuntimeExtension
    {
        public static IServiceCollection AddScheduler(
            this IServiceCollection services
        )
        {
            // var cfg = GlobalConfiguration.Configuration
            // .UseSQLiteStorage("Data Source=managment.db");

            services.AddHangfire((provider, configuration) =>
            {
                configuration.UseSQLiteStorage("Scheduler.db");

                configuration.UseFilter(new AutomaticRetryAttribute
                {
                    Attempts = 3,
                });
            });

            services.AddHangfireServer();

            services.AddTransient<ICommandHandler, CommandHandler>();

            services.AddTransient<IScheduler, Scheduler>();

            return services;
        }

        public static void SetActivityIdAsParrentId(this ISharedCommandBase command)
        {
            // This sets activity parrent / children relation..
            // Id can == null !!!
            if (command.ActivityId != null
                && Activity.Current?.ParentId == null)
            {
                Activity.Current?.SetParentId(Activity.Current.Id!);
            }
        }
    }
}