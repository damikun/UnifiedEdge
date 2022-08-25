using AutoMapper;
using Aplication.DTO;
using System.Threading.Channels;
using System.Diagnostics.Metrics;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Hosting;
using Aplication.Services.Historian;

namespace Aplication.Services
{

    public class RuntimeMetricsPropagator : IHostedService, IDisposable
    {
        private const short TRIGER_PERIOD = 2500;
        private const short DUE_TIME = 2500;
        public const string Name = "RuntimeCollector";
        public const int QUEUE_SIZE = 150;

        private readonly Channel<(string name, object? value, string? unit)> _queue = Channel.CreateBounded<(string name, object? value, string? unit)>(QUEUE_SIZE);

        public readonly IRuntimeService _runtime;
        public readonly IMapper _mapper;
        private readonly ITopicEventSender _sender;
        private readonly IHistorian _historian;

        private System.Threading.Timer? _timer;
        private MeterListener _listener = new MeterListener();

        private Task? _asyncPropagator;
        private CancellationTokenSource? _cts;

        public RuntimeMetricsPropagator(
            IRuntimeService runtime,
            ITopicEventSender sender,
            IMapper mapper,
            IHistorian historian)
        {
            InitListener();
            _runtime = runtime;
            _sender = sender;
            _mapper = mapper;
            _historian = historian;
            _asyncPropagator = null;
            _cts = null;
        }

        private void OnValueCollected<T>(
            Instrument instrument,
            T measurement,
            ReadOnlySpan<KeyValuePair<string, object>> tags,
            object state)
        {

            _queue.Writer.WriteAsync((instrument.Name, measurement, instrument.Unit)).GetAwaiter();
        }

        public void Dispose()
        {
            ListenerDisableMeasurement();
            _listener?.Dispose();
            _timer?.Dispose();
            _cts?.Dispose();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new System.Threading.Timer(CollectData!, null, DUE_TIME, TRIGER_PERIOD);

            _cts = new CancellationTokenSource();

            _asyncPropagator = Task.Run((async () => { await QueueLoop(_cts.Token); }));

            await Task.CompletedTask;
        }

        private async void CollectData(object state)
        {
            try
            {
                _listener.RecordObservableInstruments();

                // Propagate to GQL subscriptions
                await _sender.SendAsync("CpuMetrics", _mapper.Map<GQL_CpuMetrics>(_runtime.GetCpuMetrics()));
                await _sender.SendAsync("MemoryMetrics", _mapper.Map<GQL_MemoryMetrics>(_runtime.GetMemoryMetrics()));
                await _sender.SendAsync("Uptime", new GQL_Uptime() { Uptime = _runtime.Uptime });
                await _sender.SendAsync("SystemTime", DateTime.Now);
            }
            catch { }
        }

        public async Task QueueLoop(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var item = await _queue.Reader.ReadAsync(cancellationToken);

                try
                {
                    PropagateMeasurement(item, cancellationToken);

                    SaveValueToMemoryHistorian(item);

                }
                catch
                {
                    // Nothing keep looping
                }

            }
        }

        private void SaveValueToMemoryHistorian((string name, object? value, string? unit) item)
        {
            try
            {
                if (item.value != null && item.value is IConvertible convertible)
                {
                    _historian.Record(item.name, convertible);
                }
            }
            catch
            {

                // Nothing 
            }
        }

        private void PropagateMeasurement((string name, object? value, string? unit) item, CancellationToken ct)
        {
            var metric = new GQL_Metric()
            {
                Id = item.name,
                Name = item.name,
                Unit = item.unit,
                Value = item.value,
                Type = item.value?.GetType().Name,
                TimeStamp = DateTime.Now
            };

            _sender.SendAsync(item.name, metric, ct)
                .GetAwaiter();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, Timeout.Infinite);

            if (_cts != null && !_cts.IsCancellationRequested)
            {
                _cts.Cancel();
            }

            return Task.CompletedTask;
        }

        private void InitListener()
        {
            _listener.InstrumentPublished = (instrument, listener) =>
            {
                if (instrument.Meter.Name == RuntimeCollector.Name ||
                    instrument.Meter.Name == RuntimeService.Name)
                {
                    listener.EnableMeasurementEvents(instrument);
                    listener.SetMeasurementEventCallback<double>(OnValueCollected!);
                }
            };

            _listener.RecordObservableInstruments();
            _listener.Start();
        }

        private void ListenerDisableMeasurement()
        {
            _listener.InstrumentPublished = (instrument, listener) =>
            {
                if (instrument.Meter.Name == RuntimeCollector.Name ||
                    instrument.Meter.Name == RuntimeService.Name)
                {
                    listener.DisableMeasurementEvents(instrument);
                }
            };
        }
    }
}