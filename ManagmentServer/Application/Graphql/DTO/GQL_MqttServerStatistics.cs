using AutoMapper;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_MqttServerStatistics
    {
        public GQL_MqttServerStatistics()
        {

        }

        public int ConnectedClientsCount { get; set; }

        public int Topics { get; set; }

        public int Subscriptions { get; set; }

    }
}