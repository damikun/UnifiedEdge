
namespace Aplication.DTO.Scheduler
{
    public class DTO_SuccessJob
    {
        public DTO_SuccessJob()
        {

        }

        public string ID { get; set; }
        public string Name { get; set; }
        public long? TotalDuration { get; set; }
        public DateTime? SucceededAt { get; set; }
        public bool InSucceededState { get; set; }
    }
}