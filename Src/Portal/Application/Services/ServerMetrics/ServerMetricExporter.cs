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

                DateTime? timestamp = null;

                try
                {
                    MetricPointsAccessor points = metric.GetMetricPoints();

                    foreach (ref readonly var metricPoint in points)
                    {

                        timestamp = metricPoint.EndTime.DateTime;

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
                        // Struct: A.B.C.D 
                        // Struct description: Server.ServerName.Uid.Event
                        // Example: Server.EdgeMqttServer.91ed3dbfc06a4aafb5793d000854cab7.InboundPackets
                        var topic_name = $"{metric.MeterName}.{metric.Name}";

                        GQL_ServerMetric server_metric = new GQL_ServerMetric()
                        {
                            Id = metric.Name,
                            Topic = topic_name,
                            Unit = metric.Unit,
                            Value = value,
                            Description = metric.Description,
                            MeterName = metric.MeterName,
                            EventName = metric.Name,
                            TimeStamp = timestamp ?? DateTime.Now
                        };

                        // System.Console.WriteLine(topic_name);

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