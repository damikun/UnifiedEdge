using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_AdapterAddresses : IMapFrom<GQL_AdapterAddresses>
    {
        public GQL_AdapterAddresses()
        {

        }

        public List<string> UnicastAddresses { get; set; } = new List<string>();

        public List<string> MulticastAddresses { get; set; } = new List<string>();

        public List<string> GatewayAddresses { get; set; } = new List<string>();

        public List<string> DnsAddresses { get; set; } = new List<string>();

        public List<string> DhcpServerAddresses { get; set; } = new List<string>();

    }
}