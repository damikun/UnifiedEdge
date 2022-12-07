namespace Domain.Server
{
    public class MqttAuthLog
    {
        public long Id { get; set; }

#nullable disable
        public long ServerId { get; set; }
#nullable enable

        public string? ErrorMessage { get; set; }

        public string? Endpoint { get; set; }

        public MqttResultCode Code { get; set; }

        private bool isSuccess => Code == MqttResultCode.Success;

        public long? AuthClientId { get; set; }

        public long? AuthUserId { get; set; }

        public DateTime TimeStamp { get; set; }
    }

    public enum MqttResultCode : int
    {
        Success = 0,
        UnspecifiedError = 128,
        MalformedPacket = 129,
        ProtocolError = 130,
        ImplementationSpecificError = 131,
        UnsupportedProtocolVersion = 132,
        ClientIdentifierNotValid = 133,
        BadUserNameOrPassword = 134,
        NotAuthorized = 135,
        ServerUnavailable = 136,
        ServerBusy = 137,
        Banned = 138,
        BadAuthenticationMethod = 140,
        TopicNameInvalid = 144,
        PacketTooLarge = 149,
        QuotaExceeded = 151,
        PayloadFormatInvalid = 153,
        RetainNotSupported = 154,
        QoSNotSupported = 155,
        UseAnotherServer = 156,
        ServerMoved = 157,
        ConnectionRateExceeded = 159
    }
}