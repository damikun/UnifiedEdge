using System.Diagnostics.Metrics;

namespace Server.Mqtt
{
    public abstract class ServerMeterBase
    {
        protected internal readonly string ServerUid;

        protected readonly Meter Meter;

        public ServerMeterBase(IServerBase server)
        {
            this.ServerUid = server.UID;

            this.Meter = new(GetMeterName(server), "1.0");
        }

        public string MeterName
        {
            get
            {
                return Meter.Name;
            }
        }

        public static string GetMeterName<T>(T server = default!) where T : IServerBase
        {
            if (server != null)
            {
                return $"Server.{server.GetType().Name}.{server.UID}";
            }
            else
            {
                return $"Server.{typeof(T).Name}";
            }
        }

        public string GetFullMetricName(string metric_name)
        {
            return $"{metric_name}";
        }
    }
}