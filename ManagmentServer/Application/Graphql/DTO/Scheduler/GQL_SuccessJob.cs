
namespace Aplication.DTO.Scheduler
{
    public class GQL_SuccessJob
    {
        public GQL_SuccessJob()
        {

        }

        public string ID { get; set; }
        public string Name { get; set; }
        public long? TotalDuration { get; set; }
        public DateTime? SucceededAt { get; set; }
        public bool InSucceededState { get; set; }

        public virtual GQL_JobDetail? JobDetail { get; set; }
    }
}