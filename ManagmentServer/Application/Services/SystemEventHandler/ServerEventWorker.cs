using MediatR;
using Persistence;
using Aplication.Events.System;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Services.SystemEventHandler
{
    public sealed class SystemEventWorker : BackgroundService
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IMediator _mediator;

        private readonly ISystemEventQueue _queueProvider;

        private readonly IPublisher _publisher;
        public SystemEventWorker(
            IDbContextFactory<ManagmentDbCtx> factory,
            ISystemEventQueue queueProvider,
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
                    var system_event = await _queueProvider.Queue.Reader.ReadAsync();

                    try
                    {
                        dbContext.SystemEvents.Add(system_event);

                        await dbContext.SaveChangesAsync(stoppingToken);
                    }
                    catch { }

                    try
                    {
                        await _publisher.Publish(
                            new SystemEventNotification(system_event),
                            PublishStrategy.ParallelWhenAll,
                            stoppingToken
                        );
                    }
                    catch { }

                }
                catch { }
            }
            await Task.CompletedTask;
        }
    }
}