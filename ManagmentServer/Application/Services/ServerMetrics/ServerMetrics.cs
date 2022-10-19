using OpenTelemetry;
using OpenTelemetry.Metrics;
using HotChocolate.Subscriptions;

namespace Aplication.Services
{
    public class ServerMetricsProvider : IDisposable
    {
        private readonly ITopicEventSender _sender;

        private MeterProvider _provider { get; set; }

        public ServerMetricsProvider(ITopicEventSender sender)
        {
            _sender = sender;

            _provider = GetProvider();
        }

        private MeterProvider? GetProvider()
        {
            return null;

            System.Console.WriteLine("----------------------------");
            System.Console.WriteLine("Initializing SDK");
            System.Console.WriteLine("----------------------------");

            var provider = Sdk.CreateMeterProviderBuilder()
            .AddMeter("Server.EdgeMqttServer")
            .AddReader(
                new ServerMetricReader(
                    new ServerMetricsToGraphqlExporter(_sender)
                )
            )
            .Build();

            System.Console.WriteLine("----------------------------");
            System.Console.WriteLine("Initializing SDK DONE");
            System.Console.WriteLine("----------------------------");
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