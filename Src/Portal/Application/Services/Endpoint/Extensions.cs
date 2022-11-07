using System.Net;
using Server.Manager;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Services.ServerFascade
{
    public static class EndpointExtensions
    {
        public static bool AreEqual(this IPEndPoint e1, IPEndPoint e2)
        {
            return e1.Port == e2.Port && e1.Address.Equals(e2.Address);
        }

        public static IServiceCollection AddEndpointProvider(
            this IServiceCollection services
        )
        {
            services.AddSingleton<IEndpointProvider, EndpointProvider>();

            services.AddSingleton<IEndpointService>(
                e => e.GetRequiredService<IEndpointProvider>() as IEndpointService
            );

            return services;
        }
    }
}