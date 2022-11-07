
namespace Aplication.DTO.Scheduler
{

    public class GQL_JobDetail
    {
        public GQL_JobDetail()
        {

        }

        public string JobId { get; set; }

        public string LastState { get; set; }

        public string MethodCall { get; set; }

        public virtual ICollection<GQL_JobParameter> Parametrs { get; set; } = new List<GQL_JobParameter>();
    }
}