using System.Diagnostics.Metrics;

namespace Server.Mqtt
{
    public sealed class EdgeMqttServerMeter
    {
        private readonly string ServerUid;

        public EdgeMqttServerMeter(EdgeMqttServer server)
        {
            ServerUid = server.UID;

            this.Meter = new($"{typeof(EdgeMqttServer).Name}.{server.UID}", "1.0");

            ApplicationSendCounter = Meter.CreateCounter<long>(GetName(MqttMetricsConst.ApplicationSend), null, "Aplication send messages");

            ApplicationRcvdCounter = Meter.CreateCounter<long>(GetName(MqttMetricsConst.ApplicationRcvd), null, "Aplication rcvd messages");

            InboundPacketCounter = Meter.CreateCounter<long>(GetName(MqttMetricsConst.InboundPacketCount), null, "Inbound packet counter");

            OutboundPacketCounter = Meter.CreateCounter<long>(GetName(MqttMetricsConst.OutboundPacketCount), null, "Outbound packet count");

            ConnectedClientsCounter = Meter.CreateCounter<long>(GetName(MqttMetricsConst.ConnectedClients), null, "Connected client");

            ServerStateCounter = Meter.CreateCounter<bool>(GetName(MqttMetricsConst.ServerStarted), null, "Server started indicator");
        }

        private string GetName(string name)
        {
            return $"{Meter.Name}.{name}.{ServerUid}";
        }

        private readonly Meter Meter;

        public readonly Counter<long> ApplicationSendCounter;
        public readonly Counter<long> ApplicationRcvdCounter;
        public readonly Counter<long> ConnectedClientsCounter;
        public readonly Counter<long> InboundPacketCounter;
        public readonly Counter<long> OutboundPacketCounter;
        public readonly Counter<bool> ServerStateCounter;

        public static class MqttMetricsConst
        {
            public static string ConnectedClients = "ConnectedClients";

            public static string ServerStarted = "ServerStarted";

            public static string ApplicationSend = "ApplicationSend";

            public static string InboundPacketCount = "InboundPacket";

            public static string OutboundPacketCount = "OutboundPacket";

            public static string ApplicationRcvd = "ApplicationRcvd";

        }
    }
}