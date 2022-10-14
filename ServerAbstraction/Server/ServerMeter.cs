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

        public static string GetMeterName<T>(T obj = default!) where T : IServerBase
        {
            if (obj != null)
            {
                return $"Server.{obj.GetType().Name}";
            }
            else
            {
                return $"Server.{typeof(T).Name}";
            }

        }

        protected internal string GetFullMetricName(string metric_name)
        {
            return $"{Meter.Name}.{metric_name}";
        }
    }
}