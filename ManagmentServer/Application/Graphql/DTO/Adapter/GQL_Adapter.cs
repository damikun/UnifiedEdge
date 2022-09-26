using Aplication.Mapping;
using System.Net.NetworkInformation;

namespace Aplication.DTO
{
    public class GQL_Adapter : IMapFrom<DTO_Adapter>
    {
        public GQL_Adapter()
        {

        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public AdapterState State { get; set; }

        public NetworkInterfaceType InterfaceType { get; set; }

        public DTO_AdapterAddresses Addresses { get; set; }

        public string PhysicalAddress { get; set; }

        public DTO_AdapterStatistic Statistic { get; set; }

        public bool SupportsIpv4 { get; set; }

        public bool SupportsIpv6 { get; set; }

    }
}