
using MQTTnet;

namespace Server.Mqtt.DTO
{
    public class DTO_MqttMessage
    {
        public DTO_MqttMessage()
        {

        }

        public DTO_MqttMessage(MqttStoredMessage message)
        {
            Uid = message.Uid;
            ClientUid = message.ClientUid;
            ServerUid = message.ServerUid;
            Payload = message.Payload;
            ContentType = message.ContentType;
            Topic = message.Topic;
            TopicUid = message.TopicUid;
            ResponseTopic = message.ResponseTopic;
            Dup = message.Dup;
            Retain = message.Retain;
            Qos = message.Qos;
            ExpireInterval = message.ExpireInterval;
            TimeStamp = message.TimeStamp;
            ClientId = message.ClientId;
        }


        // <summary>
        /// Uid
        /// </summary>
        public string Uid { get; set; }

        // <summary>
        /// ClientUid
        /// </summary>
        public string? ClientUid { get; set; }

        // <summary>
        /// ClientId
        /// </summary>
        public string? ClientId { get; set; }

        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Payload
        /// </summary>
        public byte[]? Payload { get; set; }

        // <summary>
        /// ContentType
        /// </summary>
        public string? ContentType { get; set; }

        // <summary>
        /// ResponseTopic
        /// </summary>
        public string Topic { get; set; }

        // <summary>
        /// TopicUid
        /// </summary>
        public string? TopicUid { get; set; }

        // <summary>
        /// ResponseTopic
        /// </summary>
        public string? ResponseTopic { get; set; }

        // <summary>
        /// Dup
        /// </summary>
        public bool Dup { get; set; }

        // <summary>
        /// Retain
        /// </summary>
        public bool Retain { get; set; }

        // <summary>
        /// Qos
        /// </summary>
        public byte Qos { get; set; }

        // <summary>
        /// ExpireInterval
        /// </summary>
        public uint ExpireInterval { get; set; }

        // <summary>
        /// TimeStamp
        /// </summary>
        public DateTime TimeStamp { get; set; }


        public static DTO_MqttMessage MapFrom(MqttStoredMessage m)
        {
            return new DTO_MqttMessage()
            {
                Uid = m.Uid,
                ClientUid = m.ClientUid,
                ServerUid = m.ServerUid,
                Payload = m.Payload,
                ContentType = m.ContentType,
                Topic = m.Topic,
                TopicUid = m.TopicUid,
                ResponseTopic = m.ResponseTopic,
                Dup = m.Dup,
                Retain = m.Retain,
                Qos = m.Qos,
                ExpireInterval = m.ExpireInterval,
                TimeStamp = m.TimeStamp,
                ClientId = m.ClientId
            };
        }
    }
}