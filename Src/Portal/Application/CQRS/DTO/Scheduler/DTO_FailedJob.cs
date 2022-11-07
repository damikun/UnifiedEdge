
namespace Aplication.DTO.Scheduler
{
    public class DTO_FailedJob
    {
        public DTO_FailedJob()
        {

        }

        public string ID { get; set; }
        public string Reason { get; set; }
        public string JobName { get; set; }
        public DateTime? FailedAt { get; set; }
        public string ExceptionType { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionDetails { get; set; }
        public bool InFailedState { get; set; }
    }
}