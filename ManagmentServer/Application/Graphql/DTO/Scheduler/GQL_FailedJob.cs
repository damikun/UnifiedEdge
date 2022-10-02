
using Aplication.Mapping;

namespace Aplication.DTO.Scheduler
{
    public class GQL_FailedJob : IMapFrom<DTO_FailedJob>
    {
        public GQL_FailedJob()
        {

        }

        public string ID { get; set; }
        public string Reason { get; set; }
        public DateTime? FailedAt { get; set; }
        public string ExceptionType { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionDetails { get; set; }
        public bool InFailedState { get; set; }

        public virtual GQL_JobDetail? JobDetail { get; set; }
    }
}