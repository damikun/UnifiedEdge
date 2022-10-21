

using System.Diagnostics;

namespace OpenTelemetry.Metrics
{
    /// <summary>
    /// MetricReader implementation which collects metrics based on
    /// a user-configurable time interval and passes the metrics to
    /// the configured MetricExporter.
    /// </summary>
    public class ServerMetricReader : BaseExportingMetricReader
    {
        internal const int DefaultExportIntervalMilliseconds = 60000;
        internal const int DefaultExportTimeoutMilliseconds = 30000;

        internal readonly int ExportIntervalMilliseconds;
        internal readonly int ExportTimeoutMilliseconds;
        private readonly Thread exporterThread;
        private readonly AutoResetEvent exportTrigger = new(false);
        private readonly ManualResetEvent shutdownTrigger = new(false);
        private bool disposed;

        /// <summary>
        /// Initializes a new instance of the <see cref="PeriodicExportingMetricReader"/> class.
        /// </summary>
        /// <param name="exporter">Exporter instance to export Metrics to.</param>
        /// <param name="exportIntervalMilliseconds">The interval in milliseconds between two consecutive exports. The default value is 60000.</param>
        /// <param name="exportTimeoutMilliseconds">How long the export can run before it is cancelled. The default value is 30000.</param>
        public ServerMetricReader(
            BaseExporter<Metric> exporter,
            int exportIntervalMilliseconds = DefaultExportIntervalMilliseconds,
            int exportTimeoutMilliseconds = DefaultExportTimeoutMilliseconds)
            : base(exporter)
        {
            // Guard.ThrowIfInvalidTimeout(exportIntervalMilliseconds);
            // Guard.ThrowIfZero(exportIntervalMilliseconds);
            // Guard.ThrowIfInvalidTimeout(exportTimeoutMilliseconds);

            if ((this.SupportedExportModes & ExportModes.Push) != ExportModes.Push)
            {
                throw new InvalidOperationException($"The '{nameof(exporter)}' does not support '{nameof(ExportModes)}.{nameof(ExportModes.Push)}'");
            }

            this.ExportIntervalMilliseconds = exportIntervalMilliseconds;
            this.ExportTimeoutMilliseconds = exportTimeoutMilliseconds;

            this.exporterThread = new Thread(new ThreadStart(this.ExporterProc))
            {
                IsBackground = true,
                Name = $"OpenTelemetry-{nameof(PeriodicExportingMetricReader)}-{exporter.GetType().Name}",
            };
            this.exporterThread.Start();
        }

        /// <inheritdoc />
        protected override bool OnShutdown(int timeoutMilliseconds)
        {
            var result = true;

            try
            {
                this.shutdownTrigger.Set();
            }
            catch (ObjectDisposedException)
            {
                return false;
            }

            if (timeoutMilliseconds == Timeout.Infinite)
            {
                this.exporterThread.Join();
                result = this.exporter.Shutdown() && result;
            }
            else
            {
                var sw = Stopwatch.StartNew();
                result = this.exporterThread.Join(timeoutMilliseconds) && result;
                var timeout = timeoutMilliseconds - sw.ElapsedMilliseconds;
                result = this.exporter.Shutdown((int)Math.Max(timeout, 0)) && result;
            }

            return result;
        }

        /// <inheritdoc/>
        protected override void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.exportTrigger.Dispose();
                    this.shutdownTrigger.Dispose();
                }

                this.disposed = true;
            }

            base.Dispose(disposing);
        }

        private void ExporterProc()
        {
            int index;
            int timeout;
            var triggers = new WaitHandle[] { this.exportTrigger, this.shutdownTrigger };
            var sw = Stopwatch.StartNew();

            while (true)
            {
                timeout = (int)(this.ExportIntervalMilliseconds - (sw.ElapsedMilliseconds % this.ExportIntervalMilliseconds));

                try
                {
                    index = WaitHandle.WaitAny(triggers, timeout);
                }
                catch (ObjectDisposedException)
                {
                    return;
                }

                switch (index)
                {
                    case 0: // export
                        this.Collect(this.ExportTimeoutMilliseconds);
                        break;
                    case 1: // shutdown
                        this.Collect(this.ExportTimeoutMilliseconds);
                        return;
                    case WaitHandle.WaitTimeout: // timer
                        this.Collect(this.ExportTimeoutMilliseconds);

                        break;
                }
            }
        }
    }
}
