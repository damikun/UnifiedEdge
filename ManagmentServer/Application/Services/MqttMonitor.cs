using Persistence;
using Server.Manager;
using MQTTnet.Server;
using System.Diagnostics;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Services.MqttMonitor
{
    public sealed class MqttManagerMonitor : BackgroundService
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IMqttManager _mqtt_manager;

        private const int WAIT_TIME = 10000;

        public MqttManagerMonitor(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMqttManager manager)
        {
            _factory = factory;

            _mqtt_manager = manager;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            while (!stoppingToken.IsCancellationRequested)
            {
                List<Server.Domain.MqttServer>? servers;

                try
                {
                    servers = await dbContext.Servers
                    .OfType<Server.Domain.MqttServer>()
                    .ToListAsync();
                }
                catch
                {
                    if (!stoppingToken.IsCancellationRequested)
                        return;

                    await Task.Delay(5000);
                    continue;
                }

                foreach (var enity in servers)
                {
                    try
                    {
                        bool is_min_period = true;

                        if (enity.Created != null)
                        {
                            var dif = DateTime.Now.Subtract(enity.Created);

                            is_min_period = dif > TimeSpan.FromSeconds(WAIT_TIME);
                        }

                        if (is_min_period && !await _mqtt_manager.Contains(enity.Guid))
                        {

                            var option_builder = new MqttServerOptionsBuilder()
                            .WithDefaultEndpoint();

                            option_builder.WithDefaultEndpointPort(enity.Port);

                            var options = option_builder.Build();

                            await _mqtt_manager.AddServer(options, enity.Guid)
                            .ConfigureAwait(false);
                        }
                    }
                    catch (Exception ex)
                    {
                        // System.Console.WriteLine(ex.Message);
                        Debug.WriteLine(ex.Message);
                    }
                }

                if (!stoppingToken.IsCancellationRequested)
                    await Task.Delay(WAIT_TIME);
            }

            await Task.CompletedTask;
        }
    }
}