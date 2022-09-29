using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerErrorEvent : DTO_ServerEventBase, IMapFrom<ServerErrorEvent>
    {
        public string Message { get; set; }

        public string? Description { get; set; }

        public string? Json { get; set; }

        public string? Exception { get; set; }
    }
}