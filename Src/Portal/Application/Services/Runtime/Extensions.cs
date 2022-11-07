
using OpenTelemetry.Metrics;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Aplication.Services
{
    public static partial class RuntimeExtension
    {
        public static MeterProviderBuilder AddRuntimeMetrics(
            this MeterProviderBuilder builder,
            IServiceCollection services)
        {
            var collector = new RuntimeCollector();

            services.TryAddEnumerable(ServiceDescriptor.Singleton<IHostedService, RuntimeCollector>(e => collector));

            builder.AddMeter(RuntimeCollector.Name);
            builder.AddMeter(RuntimeService.Name);

            return builder.AddInstrumentation(() => collector);
        }
    }
}