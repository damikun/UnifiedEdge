
namespace Aplication.DTO
{

    public class GQL_Uptime
    {
        public GQL_Uptime()
        {

        }

        public TimeSpan Uptime { get; set; }

        // <summary>
        /// Uptime Days part
        /// </summary>
        public int Days => Uptime.Days;

        // <summary>
        /// Uptime Hours part
        /// </summary>
        public int Hours => Uptime.Hours;

        // <summary>
        /// Uptime Minutes part
        /// </summary>
        public int Minutes => Uptime.Minutes;

    }
}