
using AutoMapper;
using Aplication.Mapping;

namespace Server.Mqtt.DTO
{
    public class GQL_MqttClient : IMapFrom<DTO_MqttClient>
    {
        public GQL_MqttClient()
        {

        }

        // <summary>
        /// Id
        /// </summary>
        public string Id { get; set; }


        // <summary>
        /// ServerUid
        /// </summary>
        public string ServerUid { get; set; }

        // <summary>
        /// Protocol
        /// </summary>
        public GQL_MqttProtocol Protocol { get; set; }

        // <summary>
        /// ConnectedAt
        /// </summary>
        public DateTime? ConnectedAt { get; set; }

        // // <summary>
        // /// Session
        // /// </summary>
        // public GQL_MqttClientSession? Session { get; set; }

        // // <summary>
        // /// Statistics
        // /// </summary>
        // public GQL_MqttClientStatistics? Statistics { get; set; }


        [GraphQLIgnore]
        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_MqttProtocol, GQL_MqttProtocol>()
                .ConvertUsing(typeof(MqttProtocolVersionEnumMap));
        }


        private class MqttProtocolVersionEnumMap
        : ITypeConverter<DTO_MqttProtocol, GQL_MqttProtocol>
        {
            public GQL_MqttProtocol Convert(
                DTO_MqttProtocol source,
                GQL_MqttProtocol destination,
                ResolutionContext context)
            {

                switch (source)
                {
                    case DTO_MqttProtocol.V310:
                        return GQL_MqttProtocol.V310;
                    case DTO_MqttProtocol.V311:
                        return GQL_MqttProtocol.V311;
                    case DTO_MqttProtocol.V500:
                        return GQL_MqttProtocol.V500;

                    default: return GQL_MqttProtocol.Unknown;
                }
            }
        }

    }
}