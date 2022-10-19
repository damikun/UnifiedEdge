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
            System.Console.WriteLine("*****EXPORTER INSTANCE CREATED*****");
            _sender = sender;
        }

        public override ExportResult Export(in Batch<Metric> batch)
        {
            System.Console.WriteLine("*****EXPORT*****");
            using var scope = SuppressInstrumentationScope.Begin();

            System.Console.WriteLine("*****************");
            foreach (var metric in batch)
            {
                System.Console.WriteLine(metric.Meter.Name);
                System.Console.WriteLine(metric.Name);
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
                            MeterName = metric.Meter.Name,
                            TimeStamp = DateTime.Now
                        };

                        _ = _sender.SendAsync(server_metric.Topic, server_metric, default).ConfigureAwait(false);
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