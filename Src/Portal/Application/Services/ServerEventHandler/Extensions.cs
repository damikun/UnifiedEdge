using Server;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.ServerEventHandler
{
    public static partial class RuntimeExtension
    {
        public static IServiceCollection AddServerEventHandler(
            this IServiceCollection services
        )
        {
            services.AddSingleton<IServerEventQueue, ServerEventQueue>();

            services.AddSingleton<IServerEventPublisher, Aplication.Services.ServerEventHandler.ServerEventPublisher>();

            services.AddHostedService<ServerEventWorker>();

            services.AddHostedService<MessageEventWorker>();

            return services;
        }
    }
}