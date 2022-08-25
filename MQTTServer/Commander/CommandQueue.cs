using System.Threading.Channels;

namespace Server.Commander
{
    internal sealed class CommandQueue
    {
        private readonly int QUEUE_SIZE = 100;

        public CommandQueue(int max_size)
        {
            QUEUE_SIZE = max_size;

            _queue = Channel.CreateBounded<CommandQueueItem>(QUEUE_SIZE);
        }

        private readonly Channel<CommandQueueItem> _queue;

        public async Task<CommandQueueItem> AppendAsync(MqttCommand command, string service_id)
        {
            var queue_item = new CommandQueueItem(command, service_id);

            queue_item.SetState(CmdState.queued);

            await _queue.Writer.WriteAsync(queue_item);

            return queue_item;
        }

        public bool Any() => _queue.Reader.Count > 0;

        public async Task<CommandQueueItem?> DequeueAsync(CancellationToken ct)
        {
            var item = await _queue.Reader.ReadAsync(ct);

            if (item != null)
            {
                item.SetState(CmdState.pending);
            }

            return item;
        }
    }
}