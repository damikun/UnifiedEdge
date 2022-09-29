using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerConfigDiffEvent : GQL_ServerEventBase, IMapFrom<DTO_ServerConfigDiffEvent>
    {
        public string? ConfigJson { get; set; }

        public string? CurrentConfigJson { get; set; }

    }
}