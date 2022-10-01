using MediatR;
using Aplication.CQRS.Commands;
using Aplication.Services.SystemEventHandler;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IApplicationBuilder UseOnStartupProcedures(
            this IApplicationBuilder builder,
            IServiceProvider serviceProvider
        )
        {
            var mediator = serviceProvider.GetRequiredService<IMediator>();

            var system_e_publisher = serviceProvider.GetRequiredService<ISystemEventPublisher>();

            mediator.Send(new InitServerManagers());

            system_e_publisher.PublishInfo("System started", "Host aplication was started");

            return builder;
        }
    }
}