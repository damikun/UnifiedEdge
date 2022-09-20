using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.ServerFascade
{
    public static class ServerExtensions
    {
        public static IServiceCollection AddServerFascade(
            this IServiceCollection services
        )
        {
            services.AddSingleton<IServerFascade, ServerFascade>();

            return services;
        }
    }
}