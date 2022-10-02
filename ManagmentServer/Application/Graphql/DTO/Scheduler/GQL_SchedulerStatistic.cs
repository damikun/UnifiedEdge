
namespace Aplication.DTO.Scheduler
{
    public class GQL_SchedulerStatistic
    {
        public GQL_SchedulerStatistic()
        {

        }

        public long Servers { get; set; }
        public long Recurring { get; set; }
        public long Enqueued { get; set; }
        public long Queues { get; set; }
        public long Scheduled { get; set; }
        public long Processing { get; set; }
        public long Succeeded { get; set; }
        public long Failed { get; set; }
        public long Deleted { get; set; }
    }
}