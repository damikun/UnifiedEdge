using Aplication.Mapping;

namespace Aplication.DTO.Scheduler
{
    public class GQL_CountByDate : IMapFrom<DTO_CountByDate>
    {
        public DateTime Date { get; set; }
        public long Count { get; set; }
    }
}