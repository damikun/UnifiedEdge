using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace Aplication.Services
{

    /// <summary>Telemetry helpers</summary>
    public class Telemetry : ITelemetry
    {

        private readonly IOptions<TelemetryOptions> _options;

        private readonly ILogger<CurrentUser> _logger;

        /// <summary>
        /// Main constructor of TelemetryProvider
        /// </summary>
        public Telemetry(
            IOptions<TelemetryOptions> options,
            ILogger<CurrentUser> logger)
        {

            _options = options;

            _logger = logger;

            AppSource = new(_options.Value.SourceName);

        }

        public Activity Current { get { return Activity.Current!; } }

        public ActivitySource AppSource { get; private set; }

        public void SetOtelError(string error, bool log = false)
        {

            var current = Activity.Current;
            current?.SetTag("otel.status_code", "ERROR");

            if (!string.IsNullOrWhiteSpace(error))
            {

                current?.SetTag("otel.status_description", error);

                if (log)
                    _logger.LogError(error);
            }
        }

        public void SetOtelError(Exception ex)
        {

            if (ex == null)
                return;

            if (!ex.Data.Contains("command_failed"))
            {

                SetOtelError(ex.ToString(), true);
            }
        }

        public void SetOtelWarning(string message)
        {

            var current = Activity.Current;

            current?.SetTag("otel.status_code", "WARNING");

            if (!string.IsNullOrWhiteSpace(message))
            {
                current?.SetTag("otel.status_description", message);
            }
        }

    }
}
