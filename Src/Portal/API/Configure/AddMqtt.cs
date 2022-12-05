using Server.Mqtt;
using Aplication.Services;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddMqtt(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IMqttAuthHandler, MqttAuthHandler>();

            serviceCollection.AddMqttServer();

            return serviceCollection;
        }
    }
}