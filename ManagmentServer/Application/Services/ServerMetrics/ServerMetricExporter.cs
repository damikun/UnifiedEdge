using Aplication.DTO;
using OpenTelemetry;
using OpenTelemetry.Metrics;
using HotChocolate.Subscriptions;

namespace Aplication.Services
{
    public class ServerMetricsToGraphqlExporter : BaseExporter<Metric>
    {
        private readonly ITopicEventSender _sender;

        public ServerMetricsToGraphqlExporter(ITopicEventSender sender)
        {
            _sender = sender;
        }

        public override ExportResult Export(in Batch<Metric> batch)
        {
            using var scope = SuppressInstrumentationScope.Begin();

            foreach (var metric in batch)
            {
                var metricType = metric.MetricType;

                dynamic? value = null;

                try
                {
                    MetricPointsAccessor points = metric.GetMetricPoints();

                    foreach (ref readonly var metricPoint in points)
                    {
                        if (metricType.IsHistogram())
                        {
                            // Transformation Histogram to subscriptions is not supported

                            continue;
                        }
                        else if (metricType.IsDouble())
                        {
                            if (metricType.IsSum())
                            {
                                value = metricPoint.GetSumDouble();
                            }
                            else
                            {
                                value = metricPoint.GetGaugeLastValueDouble();
                            }
                        }
                        else if (metricType.IsLong())
                        {
                            if (metricType.IsSum())
                            {
                                value = metricPoint.GetSumLong();
                            }
                            else
                            {
                                value = metricPoint.GetGaugeLastValueLong();
                            }
                        }
                    }

                    if (value != null)
                    {
                        GQL_ServerMetric server_metric = new GQL_ServerMetric()
                        {
                            Id = metric.Name,
                            Topic = metric.Name,
                            Unit = metric.Unit,
                            Value = value,
                            Description = metric.Description,
                            MeterName = metric.MeterName,
                            TimeStamp = DateTime.Now
                        };

                        // Example Metric Server.EdgeMqttServer.InboundPacket
                        var topic_name = $"{metric.MeterName}.{server_metric.Topic}";
                        // System.Console.WriteLine(topic_name);
                        // System.Console.WriteLine(value);

                        _ = _sender.SendAsync(topic_name, server_metric, default).ConfigureAwait(false);

                    }

                }
                catch
                {
                    //? Log as server error ?
                }
            }

            return ExportResult.Success;
        }
    }
}