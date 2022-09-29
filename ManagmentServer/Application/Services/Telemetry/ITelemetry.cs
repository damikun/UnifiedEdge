using System.Diagnostics;

namespace Aplication.Services
{

    /// <summary>
    /// Telemetry helpers
    /// </summary>
    public interface ITelemetry
    {

        Activity Current { get; }

        void SetOtelError(string error, bool log = false);

        void SetOtelError(Exception ex);

        void SetOtelWarning(string error);

        ActivitySource AppSource { get; }

    }
}