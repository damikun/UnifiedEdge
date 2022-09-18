using Microsoft.Extensions.DependencyInjection;

namespace Server.Manager
{
    public static class Extensions
    {
        public static IServiceCollection AddServerManager<T>(
            this IServiceCollection services)
        {
            services.AddSingleton(
                typeof(IServerManager),
                typeof(T)
            );

            return services;
        }
    }
}