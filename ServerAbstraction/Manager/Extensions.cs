using Microsoft.Extensions.DependencyInjection;

namespace Server.Manager
{
    public static class Extensions
    {
        public static IServiceCollection AddServerManager<T>(
            this IServiceCollection services)
            where T : IServerManager
        {
            services.AddSingleton(e =>
                e.GetRequiredService<T>() as IServerManager
            );

            return services;
        }
    }
}