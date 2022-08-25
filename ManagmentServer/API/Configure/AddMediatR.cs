using MediatR;
using FluentValidation;
using System.Reflection;
using Aplication.Services;
using Aplication.CQRS.Commands;
using Aplication.CQRS.Behaviours;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddMediatR(this IServiceCollection services)
        {

            services.AddMediatR(cfg => cfg.Using<AppMediator>(), typeof(Templeate).GetTypeInfo().Assembly);

            services.AddTransient<Aplication.Services.IPublisher, Publisher>();

            services.AddValidatorsFromAssembly(typeof(TempleateValidator).GetTypeInfo().Assembly);

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TracingBehaviour<,>));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExBehaviour<,>));

            return services;
        }
    }
}