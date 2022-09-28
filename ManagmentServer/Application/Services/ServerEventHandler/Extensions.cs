using Server;
using Hangfire;
using Aplication.Services.ServerEventHandler;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.ServerEventHandler
{
    public static partial class RuntimeExtension
    {
        public static IServiceCollection AddServerEventHandler(
            this IServiceCollection services
        )
        {
            services.AddHangfireServer();

            services.AddSingleton<IServerEventQueue, ServerEventQueue>();

            services.AddScoped<IServerEventPublisher, Aplication.Services.ServerEventHandler.ServerEventPublisher>();

            return services;
        }
    }
}