using Aplication.CQRS.Commands;
using Aplication.Services.Scheduler;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IApplicationBuilder UseScheduledJobs(
            this IApplicationBuilder builder,
            IServiceProvider serviceProvider
        )
        {
            var scheduler = serviceProvider.GetRequiredService<IScheduler>();

            scheduler.ScheduleRecurring<CheckAdaptersStatus>(CommonCrons.Minutely);

            return builder;
        }
    }
}