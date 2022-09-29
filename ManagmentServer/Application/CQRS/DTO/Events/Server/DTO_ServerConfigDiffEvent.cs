using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerConfigDiffEvent : DTO_ServerEventBase, IMapFrom<ServerConfigDiffEvent>
    {
        public string? ConfigJson { get; set; }

        public string? CurrentConfigJson { get; set; }

    }
}