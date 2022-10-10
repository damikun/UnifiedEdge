using MediatR;
using Persistence;
using Aplication.Events.Server;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

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

                    var notifi_obj_handler = Activator.CreateInstance(
                        typeof(ServerGenericEventNotification<>).Assembly.FullName!,
                        string.Format(
                            "Aplication.Events.Server.ServerGenericEventNotification`1[[Server.{0}, Server, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]",
                            server_event.GetType().Name
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