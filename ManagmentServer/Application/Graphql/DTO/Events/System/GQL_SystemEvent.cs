using Domain.Event;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_SystemEvent : IMapFrom<DTO_SystemEvent>
    {
        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public string? Json { get; set; }

        public EventType Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

    }
}