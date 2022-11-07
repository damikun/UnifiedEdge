using System.Diagnostics;
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Hosting;

namespace Aplication.Services
{
    public readonly record struct MetricsRecord(
            double TotalCpuUsed,
            double PrivilegedCpuUsed,
            double UserCpuUsed,
            double MemoryWorkingSet,
            double NonPagedSystemMemory,
            double PagedSystemMemory,
            double PagedMemory,
            double PrivateMemory,
            double VirtualMemory,
            double GCAlocatedMemory,
            int ThreadCount,
            DateTime TimeStamp
    );

    public class OnDataCollectedEventArgs : EventArgs
    {
        public MetricsRecord Record { get; init; }

        public DateTime Timestamp { get; init; }
    }

    public class RuntimeCollector : IHostedService, IDisposable
    {
        private const short TRIGER_PERIOD = 2500;
        private const short DUE_TIME = 2500;
        public const string Name = "RuntimeCollector";
        public const string Prefix = "RuntimeMetrics";

        public static event EventHandler<OnDataCollectedEventArgs> OnDataCollected;

        private readonly Process _process = Process.GetCurrentProcess();
        private System.Threading.Timer? _timer;
        private DateTime _lastTimeStamp;
        private TimeSpan _lastTotalProcessorTime = TimeSpan.Zero;
        private TimeSpan _lastUserProcessorTime = TimeSpan.Zero;
        private TimeSpan _lastPrivilegedProcessorTime = TimeSpan.Zero;

        private static readonly Meter RuntimeMeter = new(Name, "1.0");

        public static MetricsRecord Record { get; private set; } = new MetricsRecord();

        private static readonly ObservableGauge<double> Gauge_TotalCpuUsed = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.TotalCpuUsed}",
            () => Record.TotalCpuUsed,
            "%",
            "Total CPU Percentage Used");

        private static readonly ObservableGauge<double> Gauge_PrivilegedCpuUsed = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.PrivilegedCpuUsed}",
            () => Record.PrivilegedCpuUsed,
            "%",
            "Privileged CPU Percentage Used");

        private static readonly ObservableGauge<double> Gauge_UserCpuUsed = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.UserCpuUsed}",
            () => Record.UserCpuUsed,
            "%",
            "User CPU Percentage Used");
        private static readonly ObservableGauge<double> Gauge_MemoryWorkingSet = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.MemoryWorkingSet}",
            () => Record.MemoryWorkingSet,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_NonPagedSystemMemory = RuntimeMeter.
        CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.NonPagedSystemMemory}",
            () => Record.NonPagedSystemMemory,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_PagedMemory = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.PagedMemory}",
            () => Record.PagedSystemMemory,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_PagedSystemMemory = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.PagedSystemMemory}",
            () => Record.PagedMemory,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_PrivateMemory = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.PrivateMemory}",
            () => Record.PrivateMemory,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_VirtualMemory = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.VirtualMemory}",
            () => Record.VirtualMemory,
            "Gb",
            "Amount of committed virtual memory");
        private static readonly ObservableGauge<double> Gauge_GCAlocatedMemory = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.GCAlocatedMemory}",
            () => Record.GCAlocatedMemory,
            "Mb",
            "");
        private static readonly ObservableGauge<double> Gauge_ThreadCount = RuntimeMeter
        .CreateObservableGauge<double>(
            $"{Prefix}.{RuntimeMetricsConst.ThreadCount}",
            () => Record.ThreadCount,
            "x",
            "ThreadPool Thread Count");

        public RuntimeCollector()
        {
            _lastTimeStamp = _process.StartTime;
        }

        private void OnValueCollected(MetricsRecord record)
        {
            EventHandler<OnDataCollectedEventArgs> handler = OnDataCollected;

            if (handler != null)
            {
                OnDataCollectedEventArgs args = new OnDataCollectedEventArgs()
                {
                    Record = Record,
                    Timestamp = DateTime.Now
                };

                handler(this, args);
            }
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new System.Threading.Timer(CollectData!, null, DUE_TIME, TRIGER_PERIOD);

            return Task.CompletedTask;
        }

        private void CollectData(object state)
        {
            _process.Refresh();

            var totalCpuTimeUsed = _process.TotalProcessorTime.TotalMilliseconds - _lastTotalProcessorTime.TotalMilliseconds;
            var privilegedCpuTimeUsed = _process.PrivilegedProcessorTime.TotalMilliseconds - _lastPrivilegedProcessorTime.TotalMilliseconds;
            var userCpuTimeUsed = _process.UserProcessorTime.TotalMilliseconds - _lastUserProcessorTime.TotalMilliseconds;

            _lastTotalProcessorTime = _process.TotalProcessorTime;
            _lastPrivilegedProcessorTime = _process.PrivilegedProcessorTime;
            _lastUserProcessorTime = _process.UserProcessorTime;

            try
            {
                var cpuTimeElapsed = (DateTime.UtcNow - _lastTimeStamp).TotalMilliseconds * Environment.ProcessorCount;
                _lastTimeStamp = DateTime.UtcNow;

                var totla_cpu = totalCpuTimeUsed * 100 / cpuTimeElapsed;
                var privilaged_cpu = privilegedCpuTimeUsed * 100 / cpuTimeElapsed;
                var user_cpu = userCpuTimeUsed * 100 / cpuTimeElapsed;

                Record = new MetricsRecord()
                {
                    TotalCpuUsed = totalCpuTimeUsed * 100 / cpuTimeElapsed,
                    PrivilegedCpuUsed = privilegedCpuTimeUsed * 100 / cpuTimeElapsed,
                    UserCpuUsed = userCpuTimeUsed * 100 / cpuTimeElapsed,
                    MemoryWorkingSet = _process.WorkingSet64 / (1024 * 1024),
                    NonPagedSystemMemory = _process.NonpagedSystemMemorySize64 / (1024 * 1024),
                    PagedSystemMemory = _process.PagedMemorySize64 / (1024 * 1024),
                    PagedMemory = _process.PagedSystemMemorySize64 / (1024 * 1024),
                    PrivateMemory = _process.PrivateMemorySize64 / (1024 * 1024),
                    VirtualMemory = _process.VirtualMemorySize64 / (1024 * 1024 * 1024),
                    GCAlocatedMemory = GetGCAlocatedMemoryUssage(),

                    ThreadCount = _process.Threads.Count,

                    TimeStamp = DateTime.Now
                };

            }
            catch { }

            try
            {
                OnValueCollected(Record);
            }
            catch { }
        }

        private double GetGCAlocatedMemoryUssage()
        {
            var mem_info = GC.GetGCMemoryInfo(GCKind.Any);

            var usage = GC.GetTotalMemory(true);

            if (usage <= 1)
            {
                return 0;
            }

            return usage / (1024 * 1024);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, Timeout.Infinite);

            return Task.CompletedTask;
        }
    }

    public static class RuntimeMetricsConst
    {
        public static string TotalCpuUsed = "TotalCpuUsed";

        public static string PrivilegedCpuUsed = "PrivilegedCpuUsed";

        public static string UserCpuUsed = "UserCpuUsed";

        public static string MemoryWorkingSet = "MemoryWorkingSet";

        public static string NonPagedSystemMemory = "NonPagedSystemMemory";

        public static string PagedMemory = "PagedMemory";

        public static string PagedSystemMemory = "PagedSystemMemory";

        public static string PrivateMemory = "PrivateMemory";

        public static string VirtualMemory = "VirtualMemory";

        public static string GCAlocatedMemory = "GCAlocatedMemory";

        public static string ThreadCount = "ThreadCount";
    }
}