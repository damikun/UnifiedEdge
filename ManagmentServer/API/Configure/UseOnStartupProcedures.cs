using MediatR;
using Aplication.CQRS.Commands;

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

            mediator.Send(new InitServerManagers());

            return builder;
        }
    }
}