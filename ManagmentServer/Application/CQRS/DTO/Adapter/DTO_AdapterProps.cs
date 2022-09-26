using AutoMapper;
using Aplication.Mapping;
using System.Net.NetworkInformation;

namespace Aplication.DTO
{
    public class DTO_AdapterAddresses : IMapFrom<IPInterfaceProperties>
    {
        public DTO_AdapterAddresses()
        {

        }

        public List<string> UnicastAddresses { get; set; } = new List<string>();

        public List<string> MulticastAddresses { get; set; } = new List<string>();

        public List<string> GatewayAddresses { get; set; } = new List<string>();

        public List<string> DnsAddresses { get; set; } = new List<string>();

        public List<string> DhcpServerAddresses { get; set; } = new List<string>();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<IPInterfaceProperties, DTO_AdapterAddresses>()
            .ForMember(dest => dest.UnicastAddresses, opt => opt.MapFrom(src => src.UnicastAddresses.Select(e => e.Address.ToString()).ToList()))
            .ForMember(dest => dest.MulticastAddresses, opt => opt.MapFrom(src => src.MulticastAddresses.Select(e => e.Address.ToString()).ToList()))
            .ForMember(dest => dest.GatewayAddresses, opt => opt.MapFrom(src => src.GatewayAddresses.Select(e => e.Address.ToString()).ToList()))
            .ForMember(dest => dest.DnsAddresses, opt => opt.MapFrom(src => src.DnsAddresses.Select(e => e.ToString()).ToList()))
            .ForMember(dest => dest.DhcpServerAddresses, opt => opt.MapFrom(src => src.DhcpServerAddresses.Select(e => e.ToString()).ToList()));
        }
    }
}