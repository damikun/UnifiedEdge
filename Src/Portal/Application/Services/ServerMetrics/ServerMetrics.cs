using OpenTelemetry;
using OpenTelemetry.Metrics;
using HotChocolate.Subscriptions;

namespace Aplication.Services
{
    public class ServerMetricsProvider : IDisposable
    {
        private readonly ITopicEventSender _sender;

        private MeterProvider _provider { get; set; }

        private const int TIMEOUT = 5000;

        private const int TRIGGER_PERIOD = 2500;

        public ServerMetricsProvider(ITopicEventSender sender)
        {
            _sender = sender;

            _provider = GetProvider();
        }

        private MeterProvider GetProvider()
        {
            var provider = Sdk.CreateMeterProviderBuilder()
            .AddMeter("Server.*")
            .AddReader(
                new ServerMetricReader(
                    new ServerMetricsToGraphqlExporter(_sender),
                    TRIGGER_PERIOD,
                    TIMEOUT
                )
            ).Build();

            return provider;
        }

        public void Dispose()
        {
            try
            {
                _provider.Shutdown(2000);

                _provider.Dispose();
            }
            catch { }
        }

    }
}