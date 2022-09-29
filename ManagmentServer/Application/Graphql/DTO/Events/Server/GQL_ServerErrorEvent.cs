using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerErrorEvent : GQL_ServerEventBase, IMapFrom<DTO_ServerErrorEvent>
    {
        public string Message { get; set; }

        public string? Description { get; set; }

        public string? Json { get; set; }

        public string? Exception { get; set; }
    }
}