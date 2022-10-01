using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.SystemEventHandler
{
    public static partial class RuntimeExtension
    {
        public static IServiceCollection AddSystemEventHandler(
            this IServiceCollection services
        )
        {
            services.AddSingleton<ISystemEventQueue, SystemEventQueue>();

            services.AddSingleton<ISystemEventPublisher, SystemEventPublisher>();

            services.AddHostedService<SystemEventWorker>();

            return services;
        }
    }
}