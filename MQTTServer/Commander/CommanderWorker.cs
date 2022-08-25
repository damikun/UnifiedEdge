using Server.Manager;
using Microsoft.Extensions.Hosting;

namespace Server.Commander.Worker
{
    internal sealed class CommanderWorker : BackgroundService
    {
        private readonly CommandQueue _queue;

        private readonly IMqttManager _manager;

        private readonly SemaphoreSlim _sync = new SemaphoreSlim(1);

        public CommanderWorker(CommandQueue queue, IMqttManager manager)
        {
            _queue = queue;
            _manager = manager;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                CommandQueueItem? queue_item = null;

                queue_item = await _queue.DequeueAsync(stoppingToken);

                if (queue_item == null)
                {
                    continue;
                }

                MqttManager manager = (MqttManager)_manager as MqttManager;

                await _sync.WaitAsync();

                try
                {
                    MQTTService? mqtt_service = await manager.GetService(queue_item.ServiceId) as MQTTService;

                    CancellationToken token = mqtt_service?.Ct != null ? CancellationTokenSource.CreateLinkedTokenSource(mqtt_service.Ct, stoppingToken).Token : stoppingToken;

                    _ = Task.Run(() =>
                    {
                        queue_item.SetState(CmdState.pending);

                        // To keep call order as queue was
                        _sync.Release();

                        if (mqtt_service == null)
                        {
                            throw new Exception(string.Format("Service with id: {0} was not found", queue_item.ServiceId));
                        }

                        return mqtt_service.Handle(queue_item.Command);
                    }, token
                    )
                    .ContinueWith(t => { queue_item.SetState(CmdState.errored); },
                            TaskContinuationOptions.OnlyOnFaulted)
                    .ContinueWith(t => { queue_item.SetState(CmdState.done); },
                            TaskContinuationOptions.NotOnFaulted);
                }
                catch (OperationCanceledException)
                {
                    // Prevent throwing if stoppingToken was signaled
                }

            }

            await Task.CompletedTask;
        }
    }
}