using AutoMapper;
using Aplication.Mapping;
using System.Net.NetworkInformation;

namespace Aplication.DTO
{
    public enum AdapterState
    {
        UNKNOWN,
        DOWN,
        UP
    }

    public class DTO_Adapter : IMapFrom<NetworkInterface>
    {
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

        public void Mapping(Profile profile)
        {
            profile.CreateMap<NetworkInterface, DTO_Adapter>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.OperationalStatus))
            .ForMember(dest => dest.Addresses, opt => opt.MapFrom(src => src.GetIPProperties()))
            .ForMember(dest => dest.InterfaceType, opt => opt.MapFrom(src => src.NetworkInterfaceType))
            .ForMember(dest => dest.SupportsIpv4, opt => opt.MapFrom(src => src.Supports(NetworkInterfaceComponent.IPv4)))
            .ForMember(dest => dest.SupportsIpv6, opt => opt.MapFrom(src => src.Supports(NetworkInterfaceComponent.IPv6)))
            .ForMember(dest => dest.Statistic, opt => opt.MapFrom(src => src.GetIPStatistics()))
            .ForMember(dest => dest.PhysicalAddress, opt => opt.MapFrom(src => src.GetPhysicalAddress().ToString()));

        }
    }
}