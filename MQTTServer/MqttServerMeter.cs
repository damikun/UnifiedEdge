using System.Diagnostics.Metrics;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServerMeter : ServerMeterBase
    {
        public EdgeMqttServerMeter(EdgeMqttServer server) : base(server)
        {
            ApplicationSendCounter = Meter.CreateCounter<long>(GetFullMetricName(MqttMetricsConst.ApplicationSend), null, "Aplication send messages");

            ApplicationRcvdCounter = Meter.CreateCounter<long>(GetFullMetricName(MqttMetricsConst.ApplicationRcvd), null, "Aplication rcvd messages");

            InboundPacketCounter = Meter.CreateCounter<long>(GetFullMetricName(MqttMetricsConst.InboundPacketCount), null, "Inbound packet count");

            OutboundPacketCounter = Meter.CreateCounter<long>(GetFullMetricName(MqttMetricsConst.OutboundPacketCount), null, "Outbound packet count");

            ConnectedClientsCounter = Meter.CreateCounter<long>(GetFullMetricName(MqttMetricsConst.ConnectedClients), null, "Connected client");
        }


        internal readonly Counter<long> ApplicationSendCounter;
        internal readonly Counter<long> ApplicationRcvdCounter;
        internal readonly Counter<long> ConnectedClientsCounter;
        internal readonly Counter<long> InboundPacketCounter;
        internal readonly Counter<long> OutboundPacketCounter;


        public static class MqttMetricsConst
        {
            public static string ConnectedClients = "ConnectedClients";

            public static string ApplicationSend = "ApplicationSend";

            public static string ApplicationRcvd = "ApplicationRcvd";

            public static string InboundPacketCount = "InboundPackets";

            public static string OutboundPacketCount = "OutboundPackets";
        }
    }
}