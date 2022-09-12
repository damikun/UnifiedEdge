
namespace Aplication.DTO
{

    public class GQL_Uptime
    {
        public GQL_Uptime()
        {

        }

        public TimeSpan? Uptime { get; set; }

        // <summary>
        /// IsValid
        /// </summary>
        public bool IsValid => Uptime.HasValue;

        // <summary>
        /// Uptime Days part
        /// </summary>
        public int Days => Uptime.HasValue ? Uptime.Value.Days : 0;

        // <summary>
        /// Uptime Hours part
        /// </summary>
        public int Hours => Uptime.HasValue ? Uptime.Value.Hours : 0;

        // <summary>
        /// Uptime Minutes part
        /// </summary>
        public int Minutes => Uptime.HasValue ? Uptime.Value.Minutes : 0;

    }
}