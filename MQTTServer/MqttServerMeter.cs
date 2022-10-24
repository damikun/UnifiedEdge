using System.Diagnostics.Metrics;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServerMeter : ServerMeterBase
    {
        public EdgeMqttServerMeter(EdgeMqttServer server) : base(server)
        {

            InboundPacketCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.InboundPacketCount), () => server.Stats.PacketRcvCount, "Inbound packet count");

            OutboundPacketCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.OutboundPacketCount), () => server.Stats.PacketSndCount, "Outbound packet count");

            ConnectedClientsCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.ConnectedClients), () => server.Stats.ConnectionsCount, "Connected client");

            NotConsumedMessagesCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.NotConsumedMessagesCount), () => server.Stats.NotConsumedCount, "Not consumed messages count");

            TopicSubscriptionsCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.TopicSubscriptionsCounter), () => server.Stats.SubscriptionsCount, "Activ client subscriptions count");

            TopicCounter = Meter.CreateObservableCounter<long>(GetFullMetricName(MqttMetricsConst.TopicsCounter), () => server.Stats.PublishedTopicCount, "Number of topics published over broker");
        }

        internal readonly ObservableCounter<long> ConnectedClientsCounter;
        internal readonly ObservableCounter<long> InboundPacketCounter;
        internal readonly ObservableCounter<long> OutboundPacketCounter;
        internal readonly ObservableCounter<long> NotConsumedMessagesCounter;
        internal readonly ObservableCounter<long> TopicSubscriptionsCounter;
        internal readonly ObservableCounter<long> TopicCounter;

        public static class MqttMetricsConst
        {
            public static string ConnectedClients = "ConnectedClients";

            public static string TopicSubscriptionsCounter = "TopicSubscriptions";

            public static string TopicsCounter = "Topics";

            public static string NotConsumedMessagesCount = "NotConsumedMessages";

            public static string InboundPacketCount = "InboundPackets";

            public static string OutboundPacketCount = "OutboundPackets";
        }
    }
}