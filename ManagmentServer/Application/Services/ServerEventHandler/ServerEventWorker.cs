using Persistence;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Services.ServerEventHandler
{
    public sealed class ServerEventWorker : BackgroundService
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IServerEventQueue _queueProvider;

        public ServerEventWorker(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerEventQueue queueProvider)
        {
            _factory = factory;

            _queueProvider = queueProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            while (!stoppingToken.IsCancellationRequested)
            {
                await _queueProvider.Queue.Reader.WaitToReadAsync(stoppingToken);

                var server_event = await _queueProvider.Queue.Reader.ReadAsync();
            }

            await Task.CompletedTask;
        }
    }
}