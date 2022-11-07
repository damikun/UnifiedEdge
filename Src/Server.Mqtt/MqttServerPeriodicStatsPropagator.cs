using Server.Manager.Mqtt;
using Microsoft.Extensions.Hosting;

namespace Server.Mqtt
{
    public class MqttServerPeriodicStatsPropagator : IHostedService, IDisposable
    {
        private const short DUE_TIME = 2500;

        private const short TRIGER_PERIOD = 2500;

        private System.Threading.Timer? _timer;

        private readonly IMqttServerManager _manager;

        private readonly IServerEventPublisher _publisher;

        public MqttServerPeriodicStatsPropagator(
            IServerEventPublisher publisher,
            IMqttServerManager manager
        )
        {
            _publisher = publisher;
            _manager = manager;
        }


        public void Dispose()
        {
            _timer?.Dispose();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Task.Delay(5000);

            _timer = new System.Threading.Timer(Propagate!, null, DUE_TIME, TRIGER_PERIOD);

            await Task.CompletedTask;
        }

        private async void Propagate(object state)
        {
            try
            {
                var managed_mqtt_ids = await _manager.GetManagedServerIds();

                foreach (var server_id in managed_mqtt_ids)
                {
                    if (string.IsNullOrWhiteSpace(server_id))
                    {
                        continue;
                    }

                    try
                    {
                        var server_clients = await _manager.GetClients(server_id);

                        foreach (var client in server_clients)
                        {
                            if (client == null || string.IsNullOrWhiteSpace(client.Uid))
                            {
                                continue;
                            }

                            try
                            {
                                var client_stat = await _manager.GetClientStatistics(server_id, client.Uid);

                                if (client_stat != null)
                                {
                                    _publisher.PublishEvent(new MqttServerClientStatsPropagation()
                                    {
                                        ClientId = client.Uid,
                                        ServerId = server_id,
                                        Stats = client_stat

                                    });
                                }
                            }
                            catch
                            {
                                continue;
                            }
                        }
                    }
                    catch
                    {
                        continue;
                    }
                }
            }
            catch
            {

            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, Timeout.Infinite);

            return Task.CompletedTask;
        }
    }
}