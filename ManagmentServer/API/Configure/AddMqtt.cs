using Server;
using Aplication.Services.MqttMonitor;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddMqtt(this IServiceCollection serviceCollection)
        {

            serviceCollection.AddMqttServer();

            serviceCollection.AddHostedService<MqttManagerMonitor>();

            return serviceCollection;
        }
    }
}