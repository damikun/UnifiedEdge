using AutoMapper;
using Aplication.Mapping;
using System.Net.NetworkInformation;
using System.Net.Sockets;

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
            .ForMember(dest => dest.UnicastAddresses, opt => opt.MapFrom(src => src.UnicastAddresses.Where(e => e.Address.AddressFamily == AddressFamily.InterNetwork).Select(e => e.Address.MapToIPv4().ToString()).ToList()))
            .ForMember(dest => dest.MulticastAddresses, opt => opt.MapFrom(src => src.MulticastAddresses.Where(e => e.Address.AddressFamily == AddressFamily.InterNetwork).Select(e => e.Address.MapToIPv4().ToString()).ToList()))
            .ForMember(dest => dest.GatewayAddresses, opt => opt.MapFrom(src => src.GatewayAddresses.Where(e => e.Address.AddressFamily == AddressFamily.InterNetwork).Select(e => e.Address.MapToIPv4().ToString()).ToList()))
            .ForMember(dest => dest.DnsAddresses, opt => opt.MapFrom(src => src.DnsAddresses.Where(e => e.AddressFamily == AddressFamily.InterNetwork).Select(e => e.MapToIPv4().ToString()).ToList()))
            .ForMember(dest => dest.DhcpServerAddresses, opt => opt.MapFrom(src => src.DhcpServerAddresses.Where(e => e.AddressFamily == AddressFamily.InterNetwork).Select(e => e.MapToIPv4().ToString()).ToList()));
        }
    }
}