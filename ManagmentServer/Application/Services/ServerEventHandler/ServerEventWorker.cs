using MediatR;
using Persistence;
using Aplication.Events.Server;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Aplication.Services.ServerEventHandler
{
    public sealed class ServerEventWorker : BackgroundService
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IMediator _mediator;

        private readonly IServerEventQueue _queueProvider;

        private readonly IPublisher _publisher;
        public ServerEventWorker(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerEventQueue queueProvider,
            IMediator mediator,
            IPublisher publisher)
        {
            _factory = factory;

            _mediator = mediator;

            _publisher = publisher;

            _queueProvider = queueProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            while (!stoppingToken.IsCancellationRequested)
            {
                await _queueProvider.Queue.Reader.WaitToReadAsync(stoppingToken);

                try
                {
                    var server_event = await _queueProvider.Queue.Reader.ReadAsync();

                    Assembly.Load(server_event.GetType().Assembly.FullName);

                    var even_type = server_event.GetType();

                    var event_type_name = even_type.FullName;
                    var event_assembly = even_type.Assembly.FullName;

                    var notifi_obj_handler = Activator.CreateInstance(
                        typeof(ServerGenericEventNotification<>).Assembly.FullName!,
                        string.Format(
                            "Aplication.Events.Server.ServerGenericEventNotification`1[[{0}, {1}]]",
                            event_type_name,
                            event_assembly
                        ),
                        true,
                        System.Reflection.BindingFlags.Default,
                        null,
                        new[] { server_event },
                        null,
                        null
                    );

                    var notify = notifi_obj_handler?.Unwrap();

                    await _publisher.Publish(
                        notify,
                        PublishStrategy.ParallelWhenAll,
                        stoppingToken
                    );
                }
                catch (Exception ex)
                {
                    // System.Console.WriteLine(ex.ToString());
                }
            }

            await Task.CompletedTask;
        }
    }
}