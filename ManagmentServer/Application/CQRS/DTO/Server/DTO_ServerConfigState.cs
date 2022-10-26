using Server;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class DTO_ServerConfigState : IMapFrom<ServerConfigState>
    {
        public DTO_ServerConfigState()
        {

        }

        public string ServerUid { get; set; }

        public bool IsConfigMatch { get; set; }

        public string? OnlineConfig { get; set; }

        public string? OfflineConfig { get; set; }

        public DateTime? OnlineTimeStamp { get; set; }

        public DateTime? OfflineTimeStamp { get; set; }
    }
}