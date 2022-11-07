using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_AdapterStatistic : IMapFrom<DTO_AdapterStatistic>
    {
        public GQL_AdapterStatistic()
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
    }
}