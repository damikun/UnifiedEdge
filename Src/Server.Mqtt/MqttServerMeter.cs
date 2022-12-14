using System.Diagnostics.Metrics;
using System.Collections.Concurrent;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServerMeter : ServerMeterBase, IDisposable
    {
        private readonly EdgeMqttServer _server;
        public EdgeMqttServerMeter(EdgeMqttServer server) : base(server)
        {
            _server = server;

            InboundPacketCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.InboundPacketCount), () => server.ServerStats.PacketRcvCount, "Inbound packet count");

            OutboundPacketCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.OutboundPacketCount), () => server.ServerStats.PacketSndCount, "Outbound packet count");

            ConnectedClientsCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.ConnectedClients), () => server.ServerStats.ConnectionsCount, "Connected clients count");

            NotConsumedMessagesCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.NotConsumedMessagesCount), () => server.ServerStats.NotConsumedCount, "Not consumed messages count");

            TopicSubscriptionsCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.TopicSubscriptionsCounter), () => server.ServerStats.SubscriptionsCount, "Activ subscriptions count");

            TopicCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.TopicsCounter), () => server.ServerStats.PublishedTopicCount, "Number of topics published over broker");
        }

        internal readonly ObservableCounter<long> ConnectedClientsCounter;
        internal readonly ObservableCounter<long> InboundPacketCounter;
        internal readonly ObservableCounter<long> OutboundPacketCounter;
        internal readonly ObservableCounter<long> NotConsumedMessagesCounter;
        internal readonly ObservableCounter<long> TopicSubscriptionsCounter;
        internal readonly ObservableCounter<long> TopicCounter;

        private readonly ConcurrentDictionary<string, ObservableCounter<long>> InboundTopicCounters = new ConcurrentDictionary<string, ObservableCounter<long>>();

        public void AddInboundTopicCounter(string topic_name)
        {
            InboundTopicCounters.TryAdd(
                topic_name,
                Meter.CreateObservableCounter<long>(
                    GetFullMetricName(MqttMetricsConst.InboundPacketCount),
                    () =>
                    {
                        if (_server.ServerStats.InbountTopicExist(topic_name))
                        {
                            return _server.ServerStats.PublishedTopics[topic_name];
                        }
                        else
                        {
                            return 0;
                        }
                    },
                    "Topic message counter"
                )
            );
        }

        public static class MqttMetricsConst
        {
            public static string ConnectedClients = "ConnectedClients";

            public static string TopicSubscriptionsCounter = "TopicSubscriptions";

            public static string TopicsCounter = "Topics";

            public static string NotConsumedMessagesCount = "NotConsumedMessages";

            public static string InboundPacketCount = "InboundPackets";

            public static string OutboundPacketCount = "OutboundPackets";
        }

        public void Dispose()
        {
            Meter.Dispose();
        }
    }
}