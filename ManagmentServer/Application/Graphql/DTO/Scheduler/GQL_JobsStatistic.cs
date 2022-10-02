using Aplication.Mapping;
using Aplication.DTO.Scheduler;

namespace Aplication.GraphQL.DTO
{
    public class GQL_JobsStatistic : IMapFrom<DTO_SchedulerStatistic>
    {

        public GQL_JobsStatistic()
        {
            this.RecentFailedByDate = new List<GQL_CountByDate>();
            this.RecentSucceededByDate = new List<GQL_CountByDate>();

        }

        /// <summary> ID </summary>
        public long ID { get; set; } = 1;

        public long Servers { get; set; }
        public long Recurring { get; set; }
        public long Enqueued { get; set; }
        public long Queues { get; set; }
        public long Scheduled { get; set; }
        public long Processing { get; set; }
        public long Succeeded { get; set; }
        public long Failed { get; set; }
        public long Deleted { get; set; }

        public IEnumerable<GQL_CountByDate> RecentFailedByDate { get; set; }

        public IEnumerable<GQL_CountByDate> RecentSucceededByDate { get; set; }
    }
}

