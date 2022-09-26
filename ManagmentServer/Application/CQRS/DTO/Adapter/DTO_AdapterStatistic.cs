using AutoMapper;
using Aplication.Mapping;
using System.Net.NetworkInformation;

namespace Aplication.DTO
{
    public class DTO_AdapterStatistic : IMapFrom<IPInterfaceStatistics>
    {
        public DTO_AdapterStatistic()
        {

        }

        //
        // Summary:
        //     Gets the number of bytes that were received on the interface.
        //
        // Returns:
        //     The total number of bytes that were received on the interface.
        public long BytesReceived { get; }
        //
        // Summary:
        //     Gets the number of bytes that were sent on the interface.
        //
        // Returns:
        //     The total number of bytes that were sent on the interface.
        public long BytesSent { get; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<IPInterfaceStatistics, DTO_AdapterStatistic>()
            .ForMember(dest => dest.BytesReceived, opt => opt.MapFrom(src => src.BytesReceived))
            .ForMember(dest => dest.BytesSent, opt => opt.MapFrom(src => src.BytesSent));
        }
    }
}