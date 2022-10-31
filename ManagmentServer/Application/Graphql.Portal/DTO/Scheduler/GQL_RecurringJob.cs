using Aplication.Mapping;

namespace Aplication.DTO.Scheduler
{
    public class GQL_RecurringJob : IMapFrom<DTO_RecurringJob>
    {
        public GQL_RecurringJob()
        {

        }

        public string ID { get; set; }
        public string Cron { get; set; }
        public string Queue { get; set; }
        public DateTime? NextExecution { get; set; }
        public DateTime? LastExecution { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string CallName { get; set; }
        public string LastJobId { get; set; }
        public string LastJobState { get; set; }
        public bool Removed { get; set; }
        public string TimeZoneId { get; set; }
        public string? Error { get; set; }
        public int RetryAttempt { get; set; }

        public virtual GQL_JobDetail? JobDetail { get; set; }
    }
}