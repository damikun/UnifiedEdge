using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_ServerConfigState : IMapFrom<DTO_ServerConfigState>
    {
        public GQL_ServerConfigState()
        {

        }

        public bool IsConfigMatch { get; set; }

        public string? OnlineConfig { get; set; }

        public string? OfflineConfig { get; set; }

        public DateTime? OnlineTimeStamp { get; set; }

        public DateTime? OfflineTimeStamp { get; set; }
    }
}