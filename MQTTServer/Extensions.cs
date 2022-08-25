using MQTTnet.Server;
using Server.Manager;
using Server.Commander;
using Server.Commander.Worker;
using Microsoft.Extensions.DependencyInjection;

namespace Server
{

    public static class Extensions
    {

        public static IServiceCollection AddMqttServer(
            this IServiceCollection services,
            Action<MqttServerOptions>? setupAction = null)
        {
            services.AddSingleton<IMqttManager, MqttManager>();

            services.AddSingleton<IMqttRuntimeStore, MqttRuntimeMemoryStore>();

            //Commander
            services.AddSingleton<CommandQueue>(e => new CommandQueue(100));
            services.AddSingleton<IMqttCommander, MqttCommander>();
            services.AddHostedService<CommanderWorker>();

            return services;
        }
    }
}