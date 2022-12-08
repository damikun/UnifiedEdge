using MQTTnet.Server;
using MQTTnet.Packets;
using MQTTnet.Formatter;
using System.Collections;

namespace Server.Mqtt.DTO
{
    public class DTO_MqttAuthArgs
    {
        public DTO_MqttAuthArgs()
        {

        }

        public DTO_MqttAuthArgs(ValidatingConnectionEventArgs args)
        {
            this.UserName = args.Endpoint;
            this.Ctx = args.SessionItems;
            this.SessionExpiryInterval = args.SessionExpiryInterval;
            this.ServerReference = args.ServerReference;
            this.ResponseAuthenticationData = args.ResponseAuthenticationData;

            this.RequestResponseInformation = args.RequestResponseInformation;
            this.RequestProblemInformation = args.RequestProblemInformation;
            this.ReceiveMaximum = args.ReceiveMaximum;

            this.ProtocolVersion = args.ProtocolVersion;
            this.MaximumPacketSize = args.MaximumPacketSize;
            this.KeepAlivePeriod = args.KeepAlivePeriod;
            this.IsSecureConnection = args.IsSecureConnection;
            this.Endpoint = args.Endpoint;

            this.ClientId = args.ClientId;
            this.CleanSession = args.CleanSession;
            this.AuthenticationMethod = args.AuthenticationMethod;
            this.AuthenticationData = args.AuthenticationData;
            this.AssignedClientIdentifier = args.AssignedClientIdentifier;

            this.UserProperties = args.UserProperties;
            this.WillDelayInterval = args.WillDelayInterval;
        }

        public string ServerUid { get; set; }

        public string UserName { get; set; }

        public IDictionary Ctx { get; set; }

        public uint SessionExpiryInterval { get; set; }

        public string ServerReference { get; set; }

        public byte[] ResponseAuthenticationData { get; set; }

        public bool RequestResponseInformation { get; set; }

        public bool RequestProblemInformation { get; set; }

        public ushort ReceiveMaximum { get; set; }

        public MqttProtocolVersion ProtocolVersion { get; set; }

        public uint MaximumPacketSize { get; set; }

        public ushort? KeepAlivePeriod { get; set; }

        public bool IsSecureConnection { get; set; }

        public string Endpoint { get; set; }

        public string ClientId { get; set; }

        public bool? CleanSession { get; set; }

        public string AuthenticationMethod { get; set; }

        public byte[] AuthenticationData { get; set; }

        public string AssignedClientIdentifier { get; set; }

        public List<MqttUserProperty> UserProperties { get; set; }

        public uint WillDelayInterval { get; set; }
    }
}