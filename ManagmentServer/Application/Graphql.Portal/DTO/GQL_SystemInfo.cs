
namespace Aplication.DTO
{

    public class GQL_SystemInfo
    {
        public GQL_SystemInfo()
        {

        }

        public string Id { get { return "GQL_SystemInfo"; } }
        public string ProcessName { get; set; }
        public string MachineName { get; set; }
        public ICollection<string> AppUrls { get; set; }
        public DTO_OS OsVersion { get; set; }
        public string TargetFramework { get; set; }
        public GQL_Uptime Uptime { get; set; }
        public DateTime ServerDateTime { get; set; }

    }
}