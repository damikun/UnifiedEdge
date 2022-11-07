
using Server.Mqtt;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddMqtt(this IServiceCollection serviceCollection)
        {

            serviceCollection.AddMqttServer();

            return serviceCollection;
        }
    }
}