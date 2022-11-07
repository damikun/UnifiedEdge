
using Aplication.Services;
using Aplication.Services.Historian;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddRuntimeService(
            this IServiceCollection serviceCollection)
        {

            serviceCollection.AddSingleton<IHistorian, InMemoryHistorian>();

            serviceCollection.AddSingleton<IRuntimeService, RuntimeService>();

            serviceCollection.AddHostedService<RuntimeMetricsPropagator>();

            return serviceCollection;

        }
    }
}