using MQTTnet.Server;
using Server.Manager;
using Server.Manager.Mqtt;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Mqtt
{
    public static class Extensions
    {
        public static IServiceCollection AddMqttServer(
            this IServiceCollection services,
            Action<MqttServerOptions>? setupAction = null)
        {
            services.AddSingleton<IMqttServerManager, MqttServerManager>();

            services.AddServerManager<IMqttServerManager>();

            // services.AddHostedService<MqttMetricsPropagator>();

            return services;
        }
    }
}