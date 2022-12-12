using MQTTnet.Diagnostics;

namespace Server.Mqtt
{
    public class MqttServerLog : QueueItem
    {
        public MqttNetLogLevel LogLevel { get; set; }

        public string? Source { get; set; }

        public string? Message { get; set; }

        public string? Exception { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }

    public class MqttServerInMemoryLogger : IMqttNetLogger
    {
        public MqttServerInMemoryLogger()
        {

        }

        private long _enabled;

        private const int LOGS_BUFFER_SIZE = 500;

        private readonly ConcurrentCircularBuffer<MqttServerLog> _store =
             new ConcurrentCircularBuffer<MqttServerLog>(LOGS_BUFFER_SIZE);

        public bool IsEnabled => Interlocked.Read(ref _enabled) == 1;

        public void Publish(
            MqttNetLogLevel logLevel,
            string source,
            string message,
            object[] parameters,
            Exception exception
        )
        {
            if (!IsEnabled)
            {
                return;
            }

            _store.Enqueue(new MqttServerLog()
            {
                Exception = exception != null ? exception.ToString() : null,
                LogLevel = logLevel,
                Source = source,
                Message = message
            });
        }

        internal void EnableLogger(bool enable)
        {
            if (enable)
            {
                Interlocked.Exchange(ref _enabled, 1);
            }
            else
            {
                Interlocked.Exchange(ref _enabled, 0);
            }

        }

        internal void Clean()
        {
            _store.Clean();
        }

        internal IEnumerable<MqttServerLog> GetLogs()
        {
            return _store;
        }
    }
}